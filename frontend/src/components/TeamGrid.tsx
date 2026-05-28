import React from 'react';
import { TeamSlotPopulated, Identity } from '../types';
import { Sparkles, UserPlus, RefreshCw, Trash2, Plus, Star } from 'lucide-react';

interface TeamGridProps {
  slots: TeamSlotPopulated[];
  onOpenSelector: (slotIndex: number, type: 'identity' | 'ego' | 'sinner') => void;
  onRemoveSlot: (slotIndex: number) => void;
}

export const TeamGrid: React.FC<TeamGridProps> = ({
  slots,
  onOpenSelector,
  onRemoveSlot
}) => {
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
      <Star key={i} size={12} className="fill-current text-[var(--color-accent-gold)]" />
    ));
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.25rem',
      width: '100%'
    }}>
      {slots.map((slot, index) => {
        const hasIdentity = !!slot.identityId;
        const identity = slot.identityId as Identity;
        const sinnerName = slot.sinnerId ? slot.sinnerId.replace('_', ' ').toUpperCase() : '';

        // Empty slot
        if (!slot.sinnerId) {
          return (
            <div
              key={index}
              onClick={() => onOpenSelector(index, 'sinner')}
              className="glass-panel"
              style={{
                minHeight: '420px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                gap: '1rem',
                border: '1px dashed var(--border-metallic)',
                background: 'rgba(20, 23, 28, 0.4)',
                borderRadius: '8px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent-gold)';
                e.currentTarget.style.background = 'rgba(200, 150, 62, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-metallic)';
                e.currentTarget.style.background = 'rgba(20, 23, 28, 0.4)';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-metallic)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-secondary)'
              }}>
                <UserPlus size={24} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>DEPLOY SINNER</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Slot {index + 1}</p>
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className="glass-panel"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'linear-gradient(180deg, rgba(22,25,30,0.85) 0%, rgba(14,16,20,0.95) 100%)'
            }}
          >
            {/* Slot Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              paddingBottom: '0.75rem'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', letterSpacing: '1px' }}>
                  SLOT 0{index + 1}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', letterSpacing: '0.5px' }}>
                  {sinnerName}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => onOpenSelector(index, 'sinner')}
                  className="btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  title="Change Sinner"
                >
                  <RefreshCw size={12} />
                </button>
                <button
                  onClick={() => onRemoveSlot(index)}
                  className="btn-icon"
                  style={{ width: '28px', height: '28px', color: 'var(--sin-wrath)' }}
                  title="Remove Sinner"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            {/* Active Identity Info */}
            {hasIdentity ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '0.25rem' }}>
                      {getRarityStars(identity.rarity)}
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-gold)' }}>
                      {identity.name}
                    </h4>
                  </div>
                  <button
                    onClick={() => onOpenSelector(index, 'identity')}
                    className="btn-secondary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', letterSpacing: '0.5px' }}
                  >
                    CHANGE ID
                  </button>
                </div>

                {/* Identity Stats & Resistances */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: 'rgba(0,0,0,0.25)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)'
                }}>
                  <span>HP: <strong style={{ color: 'white' }}>{identity.hp}</strong></span>
                  <span>DEF: <strong style={{ color: 'white' }}>{identity.defense}</strong></span>
                  <span>SPEED: <strong style={{ color: 'white' }}>{identity.speedRange}</strong></span>
                </div>

                {/* Resistances Panel */}
                <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'space-between' }}>
                  {['slash', 'pierce', 'blunt'].map(dmg => {
                    const resValue = identity.resistances[dmg as keyof typeof identity.resistances];
                    const labelColor = resValue === 'Fatal' ? 'var(--sin-wrath)' : resValue === 'Ineffective' ? 'var(--sin-gluttony)' : 'var(--color-text-primary)';
                    return (
                      <div key={dmg} style={{
                        flex: 1,
                        background: 'rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255,255,255,0.03)',
                        borderRadius: '3px',
                        padding: '4px 6px',
                        textAlign: 'center',
                        fontSize: '0.7rem'
                      }}>
                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.6rem', textTransform: 'uppercase' }}>{dmg}</div>
                        <div style={{ fontWeight: 'bold', color: labelColor, marginTop: '2px' }}>{resValue}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Skills Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.25rem' }}>
                  {[identity.skills.s1, identity.skills.s2, identity.skills.s3].map((sk, sIdx) => (
                    <div key={sIdx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 10px',
                      background: 'rgba(0,0,0,0.2)',
                      borderLeft: `3px solid ${sinColors[sk.affinity]}`,
                      borderRadius: '4px'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>
                          S{sIdx + 1}: {sk.name}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '1px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: sinColors[sk.affinity] }} />
                          {sk.affinity} • {sk.damageType}
                        </span>
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        color: 'white',
                        fontWeight: 600
                      }}>
                        {sk.basePower} + {sk.coinCount}x{sk.coinPower}
                      </div>
                    </div>
                  ))}

                  {/* Defense Skill */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    background: 'rgba(255,255,255,0.01)',
                    borderLeft: `3px solid var(--sin-defense)`,
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.03)'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        DF: {identity.skills.defense.name}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--color-text-secondary)'
                    }}>
                      {identity.skills.defense.basePower} + {identity.skills.defense.coinCount}x{identity.skills.defense.coinPower}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                flex: 1,
                border: '1px dashed var(--border-metallic)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 1rem',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <Sparkles size={20} style={{ color: 'var(--color-accent-gold)' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>NO ACTIVE IDENTITY</span>
                <button
                  onClick={() => onOpenSelector(index, 'identity')}
                  className="btn-primary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', marginTop: '0.5rem' }}
                >
                  SELECT IDENTITY
                </button>
              </div>
            )}

            {/* EGO Tray */}
            <div style={{
              marginTop: 'auto',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              paddingTop: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>EQUIPPED E.G.O</span>
                <button
                  onClick={() => onOpenSelector(index, 'ego')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-accent-gold)',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  <Plus size={10} /> EDIT
                </button>
              </div>

              {slot.egoIds && slot.egoIds.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {slot.egoIds.map((ego) => (
                    <div key={ego._id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(169, 32, 32, 0.05)',
                      border: '1px solid rgba(169, 32, 32, 0.15)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem'
                    }}>
                      <span style={{ fontWeight: 600, color: 'white' }}>{ego.name}</span>
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        color: 'var(--color-accent-gold)',
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(0,0,0,0.3)',
                        padding: '1px 4px',
                        borderRadius: '2px'
                      }}>
                        {ego.riskLevel}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  No E.G.O equipped
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
