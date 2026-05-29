import React from 'react';
import { TeamSlotPopulated, Ego } from '../types';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface SynergyDashboardProps {
  slots: TeamSlotPopulated[];
}

const SynergyDashboardComponent: React.FC<SynergyDashboardProps> = ({ slots }) => {
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

  const activeSlots = slots.filter((s: TeamSlotPopulated) => s.sinnerId && s.identityId);

  // 1. Calculate Sin Production (Weighted: S1=3, S2=2, S3=1)
  const sinProduction: Record<string, number> = {
    Wrath: 0, Lust: 0, Sloth: 0, Gluttony: 0, Gloom: 0, Pride: 0, Envy: 0
  };
  
  // Also calculate raw counts (number of skills)
  const sinRawCount: Record<string, number> = {
    Wrath: 0, Lust: 0, Sloth: 0, Gluttony: 0, Gloom: 0, Pride: 0, Envy: 0
  };

  activeSlots.forEach((slot: TeamSlotPopulated) => {
    if (!slot.identityId) return;
    const { s1, s2, s3 } = slot.identityId.skills;

    // Weighted count (3x S1, 2x S2, 1x S3 in character deck)
    if (s1.affinity in sinProduction) {
      sinProduction[s1.affinity] += 3;
      sinRawCount[s1.affinity] += 1;
    }
    if (s2.affinity in sinProduction) {
      sinProduction[s2.affinity] += 2;
      sinRawCount[s2.affinity] += 1;
    }
    if (s3.affinity in sinProduction) {
      sinProduction[s3.affinity] += 1;
      sinRawCount[s3.affinity] += 1;
    }
  });

  // 2. Calculate EGO Cost requirements
  const allEquippedEgos: Ego[] = [];
  activeSlots.forEach((slot: TeamSlotPopulated) => {
    if (slot.egoIds) {
      allEquippedEgos.push(...slot.egoIds);
    }
  });

  const totalEgoCost: Record<string, number> = {
    Wrath: 0, Lust: 0, Sloth: 0, Gluttony: 0, Gloom: 0, Pride: 0, Envy: 0
  };

  allEquippedEgos.forEach((ego: Ego) => {
    Object.entries(ego.cost).forEach(([affinity, cost]) => {
      if (affinity in totalEgoCost) {
        totalEgoCost[affinity] += cost;
      }
    });
  });

  // 3. Damage Type Distribution
  let slashCount = 0;
  let pierceCount = 0;
  let bluntCount = 0;

  activeSlots.forEach((slot: TeamSlotPopulated) => {
    if (!slot.identityId) return;
    const { s1, s2, s3 } = slot.identityId.skills;
    
    // Weighted by deck frequency
    if (s1.damageType === 'Slash') slashCount += 3;
    else if (s1.damageType === 'Pierce') pierceCount += 3;
    else if (s1.damageType === 'Blunt') bluntCount += 3;

    if (s2.damageType === 'Slash') slashCount += 2;
    else if (s2.damageType === 'Pierce') pierceCount += 2;
    else if (s2.damageType === 'Blunt') bluntCount += 2;

    if (s3.damageType === 'Slash') slashCount += 1;
    else if (s3.damageType === 'Pierce') pierceCount += 1;
    else if (s3.damageType === 'Blunt') bluntCount += 1;
  });

  const totalDamageCount = slashCount + pierceCount + bluntCount || 1;
  const slashPercent = Math.round((slashCount / totalDamageCount) * 100);
  const piercePercent = Math.round((pierceCount / totalDamageCount) * 100);
  const bluntPercent = Math.round((bluntCount / totalDamageCount) * 100);

  // 4. Defense/Resistance Profile (Fatal, Normal, Ineffective count)
  let resSlash = { Fatal: 0, Normal: 0, Ineffective: 0 };
  let resPierce = { Fatal: 0, Normal: 0, Ineffective: 0 };
  let resBlunt = { Fatal: 0, Normal: 0, Ineffective: 0 };

  activeSlots.forEach((slot: TeamSlotPopulated) => {
    if (!slot.identityId) return;
    const { slash, pierce, blunt } = slot.identityId.resistances;
    resSlash[slash as keyof typeof resSlash]++;
    resPierce[pierce as keyof typeof resPierce]++;
    resBlunt[blunt as keyof typeof resBlunt]++;
  });

  // Helper to check if EGO can be funded
  const checkEgoSynergy = (ego: Ego) => {
    const missing: string[] = [];
    Object.entries(ego.cost).forEach(([affinity, cost]) => {
      if (cost > 0 && sinProduction[affinity] === 0) {
        missing.push(affinity);
      }
    });
    return {
      isCompatible: missing.length === 0,
      missing
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      {/* 1. Sin production dashboard */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          SIN RESOURCE POOL (DECK RATE)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Object.entries(sinProduction).map(([sinName, weightedVal]) => {
            const rawVal = sinRawCount[sinName];
            const maxWeightedVal = 36; // Max theoretical production of one sin in a team
            const pct = Math.min((weightedVal / maxWeightedVal) * 100, 100);
            const reqVal = totalEgoCost[sinName];

            return (
              <div key={sinName} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: sinColors[sinName] }} />
                    <span style={{ fontWeight: 600, color: 'white' }}>{sinName}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    {weightedVal > 0 ? (
                      <>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>{weightedVal}</span>
                        <span style={{ fontSize: '0.65rem' }}> ({rawVal} IDs)</span>
                      </>
                    ) : '0'}
                    {reqVal > 0 && <span style={{ color: 'var(--color-accent-gold)' }}> / Req: {reqVal}</span>}
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: sinColors[sinName],
                    boxShadow: weightedVal > 0 ? `0 0 8px ${sinColors[sinName]}` : '',
                    borderRadius: '2px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. E.G.O Synergy Match */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          E.G.O SYNERGY CHECK
        </h3>
        {allEquippedEgos.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
            {allEquippedEgos.map((ego, index) => {
              const { isCompatible, missing } = checkEgoSynergy(ego);
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  background: 'rgba(0,0,0,0.2)',
                  border: `1px solid ${isCompatible ? 'rgba(59, 168, 44, 0.2)' : 'rgba(169, 32, 32, 0.2)'}`,
                  borderRadius: '4px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                      {ego.name}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {ego.sinnerId.replace('_', ' ').toUpperCase()} • {ego.riskLevel}
                    </span>
                  </div>
                  
                  {isCompatible ? (
                    <CheckCircle2 size={16} style={{ color: 'var(--sin-gluttony)' }} aria-label="Synergy Match: All resources generated" />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertTriangle size={16} style={{ color: 'var(--sin-wrath)' }} aria-label={`Missing production for: ${missing.join(', ')}`} />
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {missing.map(m => (
                          <span key={m} style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: sinColors[m]
                          }} title={`Missing ${m}`} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic', display: 'block', textAlign: 'center', padding: '1rem 0' }}>
            No E.G.Os equipped on active characters
          </span>
        )}
      </div>

      {/* 3. Attack Type Breakdown */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          ATTACK DAMAGE PROFILE
        </h3>
        {activeSlots.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {/* Slash */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: 'white', fontWeight: 600 }}>Slash</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{slashPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.02)', borderRadius: '3px' }}>
                <div style={{ width: `${slashPercent}%`, height: '100%', background: 'linear-gradient(90deg, #d32f2f, #ef5350)', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Pierce */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: 'white', fontWeight: 600 }}>Pierce</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{piercePercent}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.02)', borderRadius: '3px' }}>
                <div style={{ width: `${piercePercent}%`, height: '100%', background: 'linear-gradient(90deg, #f57c00, #ffb74d)', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Blunt */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: 'white', fontWeight: 600 }}>Blunt</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{bluntPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.02)', borderRadius: '3px' }}>
                <div style={{ width: `${bluntPercent}%`, height: '100%', background: 'linear-gradient(90deg, #fbc02d, #fff176)', borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic', display: 'block', textAlign: 'center', padding: '1rem 0' }}>
            No active characters to evaluate
          </span>
        )}
      </div>

      {/* 4. Team Resistances */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          DEFENSIVE VULNERABILITIES
        </h3>
        {activeSlots.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '6px 8px', borderRadius: '4px' }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Slash Defense</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
                Fatal: <strong style={{ color: 'var(--sin-wrath)' }}>{resSlash.Fatal}</strong> | Normal: <strong style={{ color: 'white' }}>{resSlash.Normal}</strong> | Ineff: <strong style={{ color: 'var(--sin-gluttony)' }}>{resSlash.Ineffective}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '6px 8px', borderRadius: '4px' }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Pierce Defense</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
                Fatal: <strong style={{ color: 'var(--sin-wrath)' }}>{resPierce.Fatal}</strong> | Normal: <strong style={{ color: 'white' }}>{resPierce.Normal}</strong> | Ineff: <strong style={{ color: 'var(--sin-gluttony)' }}>{resPierce.Ineffective}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '6px 8px', borderRadius: '4px' }}>
              <span style={{ color: 'white', fontWeight: 600 }}>Blunt Defense</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
                Fatal: <strong style={{ color: 'var(--sin-wrath)' }}>{resBlunt.Fatal}</strong> | Normal: <strong style={{ color: 'white' }}>{resBlunt.Normal}</strong> | Ineff: <strong style={{ color: 'var(--sin-gluttony)' }}>{resBlunt.Ineffective}</strong>
              </span>
            </div>
          </div>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic', display: 'block', textAlign: 'center', padding: '1rem 0' }}>
            No active characters to evaluate
          </span>
        )}
      </div>
    </div>
  );
};

export const SynergyDashboard = React.memo(SynergyDashboardComponent) as React.FC<SynergyDashboardProps>;
