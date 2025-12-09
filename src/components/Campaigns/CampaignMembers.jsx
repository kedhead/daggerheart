import { useState } from 'react';
import { UserPlus, X, Mail, Shield, User } from 'lucide-react';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './CampaignMembers.css';

export default function CampaignMembers({ campaign, currentUserId }) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState('');

  const isDM = campaign.dmId === currentUserId;
  const members = campaign.members || {};

  const handleInvite = async (e) => {
    e.preventDefault();

    if (!isDM) {
      setError('Only the DM can invite players');
      return;
    }

    setInviting(true);
    setError('');

    try {
      // Add email to pending invitations
      const campaignRef = doc(db, `users/${campaign.createdBy}/campaigns/${campaign.id}`);
      await updateDoc(campaignRef, {
        pendingInvites: arrayUnion(inviteEmail.toLowerCase()),
        updatedAt: serverTimestamp()
      });

      setInviteEmail('');
      alert(`Invitation sent to ${inviteEmail}. They can accept it by signing up with this email.`);
    } catch (err) {
      console.error('Error inviting player:', err);
      setError('Failed to send invitation');
    } finally {
      setInviting(false);
    }
  };

  return (
    <div className="campaign-members">
      <h3>Campaign Members</h3>

      <div className="members-list">
        {Object.entries(members).map(([uid, member]) => (
          <div key={uid} className="member-item">
            <div className="member-icon">
              {member.role === 'dm' ? <Shield size={20} /> : <User size={20} />}
            </div>
            <div className="member-info">
              <span className="member-name">{member.displayName}</span>
              <span className="member-email">{member.email}</span>
            </div>
            <span className={`member-role ${member.role}`}>
              {member.role === 'dm' ? 'Dungeon Master' : 'Player'}
            </span>
          </div>
        ))}
      </div>

      {campaign.pendingInvites && campaign.pendingInvites.length > 0 && (
        <div className="pending-invites">
          <h4>Pending Invitations</h4>
          {campaign.pendingInvites.map((email, index) => (
            <div key={index} className="pending-invite-item">
              <Mail size={16} />
              <span>{email}</span>
            </div>
          ))}
        </div>
      )}

      {isDM && (
        <form onSubmit={handleInvite} className="invite-form">
          <h4>Invite Player</h4>
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="player@email.com"
              required
              disabled={inviting}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={inviting}
            >
              <UserPlus size={18} />
              {inviting ? 'Inviting...' : 'Invite'}
            </button>
          </div>
          <p className="invite-instructions">
            Players will be able to join this campaign by signing up or logging in with this email address.
          </p>
        </form>
      )}
    </div>
  );
}
