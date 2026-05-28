import React, { useState } from 'react';
import { Identity, Ego, Sinner } from '../types';
import { X, Search, Star } from 'lucide-react';

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'identity' | 'ego' | 'sinner';
  sinnerName: string;
  identities: Identity[];
  egos: Ego[];
  sinners: Sinner[];
  activeIdentityId?: string;
  activeEgoIds?: string[];
  onSelectIdentity?: (identity: Identity) => void;
  onToggleEgo?: (ego: Ego) => void;
  onSelectSinner?: (sinner: Sinner) => void;
}

export const SelectionModal: React.FC<SelectionModalProps> = ({
  isOpen,
  onClose,
  type,
  sinnerName,
  identities,
  egos,
  sinners,
  activeIdentityId,
  activeEgoIds = [],
  onSelectIdentity,
  onToggleEgo,
  onSelectSinner
}) => {
  const [search, setSearch] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<number | null>(null);
  const [selectedAffinity, setSelectedAffinity] = useState<string | null>(null);
  const [selectedDamage, setSelectedDamage] = useState<string | null>(null);

  if (!isOpen) return null;

  const sinColors: Record<string, string> = {
    Wrath: 'var(--sin-wrath)',
    Lust: 'var(--sin-lust)',
    Sloth: 'var(--sin-sloth)',
    Gluttony: 'var(--sin-gluttony)',
    Gloom: 'var(--sin-gloom)',
    Pride: 'var(--sin-pride)',
    Envy: 'var(--sin-envy)',
    Defense: 'var(--sin-defense)'
  };

  const getRarityStars = (rarity: number) => {
    return Array(rarity).fill(0).map((_, i) => (
      <Star key={i} size={14} className="fill-current text-[var(--color-accent-gold)]" />
    ));
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedRarity(null);
    setSelectedAffinity(null);
    setSelectedDamage(null);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-container" style={{
        width: '100%',
        maxWidth: '900px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(169, 32, 32, 0.3)',
        boxShadow: '0 0 40px rgba(0, 0, 0, 0.8), var(--shadow-neon-crimson)'
      }}>
        {/* Modal Header */}
        <div className="modal-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-metallic)',
          background: 'rgba(0,0,0,0.2)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '1px' }}>
            SELECT {type.toUpperCase()} FOR <span style={{ color: 'var(--color-accent-crimson)' }}>{sinnerName.toUpperCase()}</span>
          </h2>
          <button className="btn-icon" onClick={onClose} style={{ width: '32px', height: '32px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Filters Panel (only for Identity) */}
        {type === 'identity' && (
          <div className="filters-panel" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border-metallic)',
            background: 'rgba(0,0,0,0.1)'
          }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 200px' }}>
              <input
                type="text"
                placeholder="Search Identity Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="select-input"
                style={{ width: '100%', paddingLeft: '2.5rem' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            </div>

            {/* Rarity Filter */}
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginRight: '0.5rem', fontFamily: 'var(--font-mono)' }}>RARITY:</span>
              {[1, 2, 3].map(rarity => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(selectedRarity === rarity ? null : rarity)}
                  className="btn-secondary"
                  style={{
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.8rem',
                    borderColor: selectedRarity === rarity ? 'var(--color-accent-gold)' : 'var(--border-metallic)',
                    background: selectedRarity === rarity ? 'rgba(200, 150, 62, 0.15)' : ''
                  }}
                >
                  {rarity === 1 ? '0' : rarity === 2 ? '00' : '000'}
                </button>
              ))}
            </div>

            {/* Affinity Filter */}
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginRight: '0.5rem', fontFamily: 'var(--font-mono)' }}>SIN:</span>
              {['Wrath', 'Lust', 'Sloth', 'Gluttony', 'Gloom', 'Pride', 'Envy'].map(sin => (
                <button
                  key={sin}
                  onClick={() => setSelectedAffinity(selectedAffinity === sin ? null : sin)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: selectedAffinity === sin ? '2px solid white' : '1px solid rgba(0,0,0,0.5)',
                    background: sinColors[sin],
                    cursor: 'pointer',
                    boxShadow: selectedAffinity === sin ? `0 0 10px ${sinColors[sin]}` : '',
                    opacity: selectedAffinity && selectedAffinity !== sin ? 0.4 : 1,
                    transition: 'all 0.15s ease'
                  }}
                  title={sin}
                />
              ))}
            </div>

            {/* Damage Filter */}
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginRight: '0.5rem', fontFamily: 'var(--font-mono)' }}>DAMAGE:</span>
              {['Slash', 'Pierce', 'Blunt'].map(dmg => (
                <button
                  key={dmg}
                  onClick={() => setSelectedDamage(selectedDamage === dmg ? null : dmg)}
                  className="btn-secondary"
                  style={{
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.8rem',
                    borderColor: selectedDamage === dmg ? 'var(--color-accent-crimson)' : 'var(--border-metallic)',
                    background: selectedDamage === dmg ? 'rgba(169, 32, 32, 0.15)' : ''
                  }}
                >
                  {dmg}
                </button>
              ))}
            </div>

            {/* Reset Button */}
            {(search || selectedRarity || selectedAffinity || selectedDamage) && (
              <button onClick={resetFilters} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: 'var(--color-accent-crimson)' }}>
                RESET
              </button>
            )}
          </div>
        )}

        {/* Modal Body / Scroll Content */}
        <div style={{ overflowY: 'auto', padding: '1.5rem', flex: 1, background: '#0a0c0e' }}>
          {type === 'identity' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {identities
                .filter(id => {
                  const matchesSearch = id.name.toLowerCase().includes(search.toLowerCase());
                  const matchesRarity = selectedRarity ? id.rarity === selectedRarity : true;
                  const matchesAffinity = selectedAffinity
                    ? [id.skills.s1.affinity, id.skills.s2.affinity, id.skills.s3.affinity].includes(selectedAffinity)
                    : true;
                  const matchesDamage = selectedDamage
                    ? [id.skills.s1.damageType, id.skills.s2.damageType, id.skills.s3.damageType].includes(selectedDamage)
                    : true;
                  return matchesSearch && matchesRarity && matchesAffinity && matchesDamage;
                })
                .map(id => {
                  const isActive = id._id === activeIdentityId;
                  return (
                    <div
                      key={id._id}
                      onClick={() => onSelectIdentity?.(id)}
                      className="glass-panel"
                      style={{
                        padding: '1.25rem',
                        cursor: 'pointer',
                        borderColor: isActive ? 'var(--color-accent-gold)' : 'var(--border-metallic)',
                        background: isActive ? 'rgba(200, 150, 62, 0.08)' : 'rgba(25,28,34,0.6)',
                        boxShadow: isActive ? 'var(--shadow-neon-gold)' : '',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        position: 'relative',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* Identity Name / Rarity */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                            {id.sinnerId.replace('_', ' ').toUpperCase()}
                          </span>
                          <div style={{ display: 'flex', gap: '1px' }}>{getRarityStars(id.rarity)}</div>
                        </div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '0.25rem', color: 'white' }}>{id.name}</h3>
                      </div>

                      {/* Stats */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                        <span>HP: <strong style={{ color: 'white' }}>{id.hp}</strong></span>
                        <span>DEF: <strong style={{ color: 'white' }}>{id.defense}</strong></span>
                        <span>SPEED: <strong style={{ color: 'white' }}>{id.speedRange}</strong></span>
                      </div>

                      {/* Resistances */}
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '3px' }}>
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem' }}>SLASH</span>
                          <span style={{
                            color: id.resistances.slash === 'Fatal' ? 'var(--sin-wrath)' : id.resistances.slash === 'Ineffective' ? 'var(--sin-gluttony)' : 'var(--color-text-primary)',
                            fontWeight: 'bold'
                          }}>{id.resistances.slash}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '3px' }}>
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem' }}>PIERCE</span>
                          <span style={{
                            color: id.resistances.pierce === 'Fatal' ? 'var(--sin-wrath)' : id.resistances.pierce === 'Ineffective' ? 'var(--sin-gluttony)' : 'var(--color-text-primary)',
                            fontWeight: 'bold'
                          }}>{id.resistances.pierce}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '3px' }}>
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem' }}>BLUNT</span>
                          <span style={{
                            color: id.resistances.blunt === 'Fatal' ? 'var(--sin-wrath)' : id.resistances.blunt === 'Ineffective' ? 'var(--sin-gluttony)' : 'var(--color-text-primary)',
                            fontWeight: 'bold'
                          }}>{id.resistances.blunt}</span>
                        </div>
                      </div>

                      {/* Skills Preview */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.25rem' }}>
                        {[id.skills.s1, id.skills.s2, id.skills.s3].map((sk, index) => (
                          <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '4px 8px',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '4px',
                            borderLeft: `3px solid ${sinColors[sk.affinity]}`
                          }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                              S{index + 1}: {sk.name}
                            </span>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                              <span style={{ color: 'var(--color-text-secondary)' }}>{sk.damageType}</span>
                              <span style={{ color: 'white', background: 'rgba(255,255,255,0.08)', padding: '1px 4px', borderRadius: '2px' }}>
                                {sk.basePower} + {sk.coinCount}x{sk.coinPower}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {type === 'ego' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {egos.map(ego => {
                const isActive = activeEgoIds.includes(ego._id);
                return (
                  <div
                    key={ego._id}
                    onClick={() => onToggleEgo?.(ego)}
                    className="glass-panel"
                    style={{
                      padding: '1.25rem',
                      cursor: 'pointer',
                      borderColor: isActive ? 'var(--color-accent-crimson)' : 'var(--border-metallic)',
                      background: isActive ? 'rgba(169, 32, 32, 0.08)' : 'rgba(25,28,34,0.6)',
                      boxShadow: isActive ? 'var(--shadow-neon-crimson)' : '',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* EGO Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '3px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-accent-gold)'
                      }}>
                        {ego.riskLevel}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {ego.damageType.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>{ego.name}</h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Sanity Cost: {ego.sanityCost}</span>
                    </div>

                    {/* Cost breakdown */}
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>REQUIRED SIN:</span>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {Object.entries(ego.cost)
                          .filter(([_, count]) => count > 0)
                          .map(([affinity, count]) => (
                            <div key={affinity} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: 'rgba(0,0,0,0.4)',
                              padding: '2px 8px',
                              borderRadius: '20px',
                              border: `1px solid rgba(255,255,255,0.05)`
                            }}>
                              <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: sinColors[affinity]
                              }} />
                              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: 'bold' }}>
                                {count}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {type === 'sinner' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
              {sinners.map(sinner => (
                <div
                  key={sinner.id}
                  onClick={() => onSelectSinner?.(sinner)}
                  className="glass-panel"
                  style={{
                    padding: '1.25rem',
                    cursor: 'pointer',
                    background: 'rgba(25,28,34,0.6)',
                    textAlign: 'center',
                    border: '1px solid var(--border-metallic)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent-crimson)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(169, 32, 32, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-metallic)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-accent-crimson), var(--bg-darker))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'white',
                    fontFamily: 'var(--font-mono)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {sinner.code}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginTop: '0.25rem' }}>{sinner.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    LCB Sinner #{sinner.code}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
