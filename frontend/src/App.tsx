import React, { useState } from 'react';
import { Sinner, Identity, Ego, Team, TeamSlotPopulated } from './types';
import { TeamGrid } from './components/TeamGrid';
import { SynergyDashboard } from './components/SynergyDashboard';
import { SelectionModal } from './components/SelectionModal';
import { Save, FolderOpen, Trash2, Sparkles, RefreshCw, Info, Check } from 'lucide-react';

const API_BASE = '/api';

export default function App(): React.ReactElement {
  const [sinners, setSinners] = useState<Sinner[]>([]);
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [egos, setEgos] = useState<Ego[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  // Current Team State (6 slots)
  const initialSlots: TeamSlotPopulated[] = Array(6).fill(null).map(() => ({
    sinnerId: '',
    identityId: null,
    egoIds: []
  }));

  const [currentSlots, setCurrentSlots] = useState<TeamSlotPopulated[]>(initialSlots);
  const [teamName, setTeamName] = useState('My Tactical Team');
  const [teamDescription, setTeamDescription] = useState('Custom team configuration');
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

  // Selector Modal State
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [selectorType, setSelectorType] = useState<'identity' | 'ego' | 'sinner'>('sinner');

  // Loading/Error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load initial data
  const fetchData = React.useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const [sinnersRes, identitiesRes, egosRes, teamsRes] = await Promise.all([
        fetch(`${API_BASE}/sinners`),
        fetch(`${API_BASE}/identities`),
        fetch(`${API_BASE}/egos`),
        fetch(`${API_BASE}/teams`)
      ]);

      if (!sinnersRes.ok || !identitiesRes.ok || !egosRes.ok || !teamsRes.ok) {
        throw new Error('Failed to load database resources. Server might be seeding...');
      }

      const sinnersData = await sinnersRes.json();
      const identitiesData = await identitiesRes.json();
      const egosData = await egosRes.json();
      const teamsData = await teamsRes.json();

      setSinners(sinnersData);
      setIdentities(identitiesData);
      setEgos(egosData);
      setTeams(teamsData);

      // Load first saved team if available
      if (teamsData.length > 0) {
        loadTeamIntoWorkspace(teamsData[0]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Connecting to server...');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const triggerToast = React.useCallback((msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const loadTeamIntoWorkspace = React.useCallback((team: Team): void => {
    // Fill current slots from team
    const newSlots = initialSlots.map((emptySlot, idx) => {
      if (team.slots && team.slots[idx]) {
        return team.slots[idx];
      }
      return emptySlot;
    });
    setCurrentSlots(newSlots);
    setTeamName(team.name);
    setTeamDescription(team.description || '');
    setActiveTeamId(team._id || null);
  }, [initialSlots]);

  const handleOpenSelector = React.useCallback((slotIndex: number, type: 'identity' | 'ego' | 'sinner') => {
    setActiveSlotIndex(slotIndex);
    setSelectorType(type);
    setSelectorOpen(true);
  }, []);

  const handleSelectSinner = React.useCallback((sinner: Sinner) => {
    // Automatically find and select the base identity (rarity 1)
    const baseIdentity = identities.find((id: Identity) => id.sinnerId === sinner.id && id.rarity === 1) || null;
    // Automatically equip the base EGO (ZAYIN risk level)
    const baseEgo = egos.find((ego: Ego) => ego.sinnerId === sinner.id && ego.riskLevel === 'ZAYIN');

    const updated = [...currentSlots];
    updated[activeSlotIndex] = {
      sinnerId: sinner.id,
      identityId: baseIdentity,
      egoIds: baseEgo ? [baseEgo] : []
    };
    setCurrentSlots(updated);
    setSelectorOpen(false);
    triggerToast(`Deployed Sinner ${sinner.name} to slot ${activeSlotIndex + 1}`);
  }, [currentSlots, activeSlotIndex, identities, egos, triggerToast]);

  const handleSelectIdentity = React.useCallback((identity: Identity) => {
    const updated = [...currentSlots];
    updated[activeSlotIndex] = {
      ...updated[activeSlotIndex],
      identityId: identity
    };
    setCurrentSlots(updated);
    setSelectorOpen(false);
    triggerToast(`Selected Identity: ${identity.name}`);
  }, [currentSlots, activeSlotIndex, triggerToast]);

  const handleToggleEgo = React.useCallback((ego: Ego) => {
    const updated = [...currentSlots];
    const slot = updated[activeSlotIndex];

    const alreadyEquippedIndex = slot.egoIds.findIndex((e: Ego) => e._id === ego._id);
    let newEgoIds = [...slot.egoIds];

    if (alreadyEquippedIndex > -1) {
      newEgoIds.splice(alreadyEquippedIndex, 1);
      triggerToast(`Unequipped E.G.O: ${ego.name}`);
    } else {
      newEgoIds = newEgoIds.filter((e: Ego) => e.riskLevel !== ego.riskLevel);
      newEgoIds.push(ego);
      triggerToast(`Equipped E.G.O: ${ego.name}`);
    }

    updated[activeSlotIndex] = {
      ...slot,
      egoIds: newEgoIds
    };
    setCurrentSlots(updated);
  }, [currentSlots, activeSlotIndex, triggerToast]);

  const handleRemoveSlot = React.useCallback((slotIndex: number) => {
    const updated = [...currentSlots];
    updated[slotIndex] = {
      sinnerId: '',
      identityId: null,
      egoIds: []
    };
    setCurrentSlots(updated);
    triggerToast(`Removed Sinner from slot ${slotIndex + 1}`);
  }, [currentSlots, triggerToast]);

  const handleSaveTeam = React.useCallback(async (): Promise<void> => {
    if (!teamName.trim()) {
      alert('Please enter a team name');
      return;
    }

    try {
      // Map slots to format database expects (referencing ObjectIds)
      const slotsToSave = currentSlots.map((slot: TeamSlotPopulated) => ({
        sinnerId: slot.sinnerId,
        identityId: slot.identityId ? slot.identityId._id : null,
        egoIds: slot.egoIds.map((e: Ego) => e._id)
      }));

      const res = await fetch(`${API_BASE}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: teamName,
          description: teamDescription,
          slots: slotsToSave
        })
      });

      if (!res.ok) {
        throw new Error('Failed to save team composition');
      }

      const savedTeam = await res.json();
      triggerToast(`Team "${teamName}" saved successfully!`);
      
      // Refresh teams list
      const teamsRes = await fetch(`${API_BASE}/teams`);
      const teamsData = await teamsRes.json();
      setTeams(teamsData);
      setActiveTeamId(savedTeam._id);
    } catch (err: any) {
      alert(err.message || 'Error saving team');
    }
  }, [currentSlots, teamName, teamDescription, triggerToast]);

  const handleDeleteTeam = React.useCallback(async (id: string, e: React.MouseEvent): Promise<void> => {
    e.stopPropagation(); // prevent loading team upon delete click
    if (!confirm('Are you sure you want to delete this team composition?')) return;

    try {
      const res = await fetch(`${API_BASE}/teams/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete team');

      triggerToast('Deleted saved team composition.');
      if (activeTeamId === id) {
        setActiveTeamId(null);
      }
      
      // Refresh teams list
      const teamsRes = await fetch(`${API_BASE}/teams`);
      const teamsData = await teamsRes.json();
      setTeams(teamsData);
    } catch (err: any) {
      alert(err.message || 'Error deleting team');
    }
  }, [activeTeamId, triggerToast]);

  const clearWorkspace = React.useCallback(() => {
    setCurrentSlots(initialSlots);
    setTeamName('New Tactical Team');
    setTeamDescription('Custom team configuration');
    setActiveTeamId(null);
    triggerToast('Cleared active workspace.');
  }, [initialSlots, triggerToast]);

  const handleSeedDatabase = React.useCallback(async (): Promise<void> => {
    try {
      triggerToast('Re-seeding database...');
      const res = await fetch(`${API_BASE}/seed`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to seed');
      await fetchData();
      triggerToast('Database re-seeded successfully!');
    } catch (err: any) {
      alert(err.message || 'Error seeding database');
    }
  }, [fetchData, triggerToast]);

  // Get selector modal list properties
  const getSelectorModalProps = React.useMemo(() => {
    return () => {
      const activeSlot = currentSlots[activeSlotIndex];
      const slotSinnerName = activeSlot?.sinnerId 
        ? activeSlot.sinnerId.replace('_', ' ').toUpperCase()
        : 'Sinner';

      return {
        sinnerName: slotSinnerName,
        identities: identities.filter((id: Identity) => id.sinnerId === activeSlot?.sinnerId),
        egos: egos.filter((ego: Ego) => ego.sinnerId === activeSlot?.sinnerId),
        activeIdentityId: activeSlot?.identityId?._id || undefined,
        activeEgoIds: activeSlot?.egoIds.map((e: Ego) => e._id) || []
      };
    };
  }, [currentSlots, activeSlotIndex, identities, egos]);

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast">
          <Check size={16} style={{ color: 'var(--sin-gluttony)' }} />
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="glass-panel app-header">
        <div className="brand-section">
          <div className="brand-logo">
            <span>LIMBUS</span> COMPANY
          </div>
          <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <div className="brand-subtitle">
            DEP. TEAM BUILDER // SYNERGY CORE
          </div>
        </div>

        {/* Saved Team Manager Controls */}
        <div className="team-controls">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <input
              type="text"
              value={teamName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value)}
              placeholder="Team Name..."
              className="select-input"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-metallic)',
                height: '38px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                width: '180px',
                padding: '0 0.75rem'
              }}
            />
          </div>

          <button onClick={handleSaveTeam} className="btn-primary" style={{ height: '38px', fontSize: '0.75rem' }}>
            <Save size={14} /> SAVE
          </button>
          
          <button onClick={clearWorkspace} className="btn-secondary" style={{ height: '38px', fontSize: '0.75rem' }}>
            CLEAR
          </button>

          <button onClick={handleSeedDatabase} className="btn-icon" style={{ height: '38px', width: '38px' }} title="Reset/Re-seed Database Data">
            <RefreshCw size={14} />
          </button>
        </div>
      </header>

      {loading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: '1rem'
        }}>
          <RefreshCw size={36} className="animate-spin" style={{ color: 'var(--color-accent-crimson)' }} />
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
            LOADING SYSTEM DATA CORE...
          </span>
        </div>
      ) : error ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: '1rem',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <Info size={36} style={{ color: 'var(--color-accent-gold)' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Server Connection Required</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            Ensure the Docker container stack is running. If you are starting it up for the first time, it might take a few seconds to boot and seed.
          </p>
          <button onClick={fetchData} className="btn-primary" style={{ marginTop: '0.5rem' }}>
            RETRY CONNECTION
          </button>
        </div>
      ) : (
        <div className="main-layout">
          {/* Main workspace (Sinners team composition grid) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(169, 32, 32, 0.05)', border: '1px solid rgba(169, 32, 32, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                <Sparkles size={14} style={{ color: 'var(--color-accent-gold)' }} />
                <span>Select slots to deploy Sinners. Equip Identities and E.G.Os to evaluate team affinity production.</span>
              </div>
            </div>

            <TeamGrid
              slots={currentSlots}
              onOpenSelector={handleOpenSelector}
              onRemoveSlot={handleRemoveSlot}
            />
          </div>

          {/* Sidebar (Saved teams drawer & real-time Synergy Dashboard) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Real-time Synergy Dashboard */}
            <SynergyDashboard slots={currentSlots} />

            {/* Saved Teams Deck */}
            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <h3 style={{
                fontSize: '0.95rem',
                fontWeight: 800,
                letterSpacing: '1px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: '0.5rem',
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <FolderOpen size={14} style={{ color: 'var(--color-accent-gold)' }} />
                SAVED COMPOSITIONS
              </h3>
              {teams.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                  {teams.map((t) => (
                    <div
                      key={t._id}
                      onClick={() => loadTeamIntoWorkspace(t)}
                      style={{
                        padding: '8px 12px',
                        background: activeTeamId === t._id ? 'rgba(200,150,62,0.1)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${activeTeamId === t._id ? 'var(--color-accent-gold)' : 'var(--border-metallic)'}`,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (activeTeamId !== t._id) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        if (activeTeamId !== t._id) e.currentTarget.style.borderColor = 'var(--border-metallic)';
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '180px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.name}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.description || 'No description'}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteTeam(t._id!, e)}
                        className="btn-icon"
                        style={{ width: '24px', height: '24px', border: 'none', background: 'none' }}
                        title="Delete saved composition"
                      >
                        <Trash2 size={12} style={{ color: 'var(--color-text-muted)' }} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic', display: 'block', textAlign: 'center', padding: '1rem 0' }}>
                  No saved compositions.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Selector Modal Overlay */}
      <SelectionModal
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        type={selectorType}
        sinners={sinners}
        {...getSelectorModalProps()}
        onSelectSinner={handleSelectSinner}
        onSelectIdentity={handleSelectIdentity}
        onToggleEgo={handleToggleEgo}
      />
    </div>
  );
}
