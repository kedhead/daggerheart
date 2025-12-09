import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, deleteField, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export function usePendingInvites() {
  const { currentUser } = useAuth();
  const [checking, setChecking] = useState(false);
  const [joinedCampaigns, setJoinedCampaigns] = useState([]);

  useEffect(() => {
    if (!currentUser || !currentUser.email) return;

    const checkPendingInvites = async () => {
      setChecking(true);
      const userEmail = currentUser.email.toLowerCase();
      const joined = [];

      try {
        // Search all users for campaigns with pending invites
        const usersSnapshot = await getDocs(collection(db, 'users'));

        for (const userDoc of usersSnapshot.docs) {
          const campaignsRef = collection(db, `users/${userDoc.id}/campaigns`);
          const campaignsSnapshot = await getDocs(campaignsRef);

          for (const campaignDoc of campaignsSnapshot.docs) {
            const campaignData = campaignDoc.data();
            const pendingInvites = campaignData.pendingInvites || [];

            // Check if current user's email is in pending invites
            if (pendingInvites.includes(userEmail)) {
              try {
                // Add user to campaign members
                const members = campaignData.members || {};
                members[currentUser.uid] = {
                  role: 'player',
                  email: currentUser.email,
                  displayName: currentUser.displayName || currentUser.email,
                  joinedAt: serverTimestamp()
                };

                // Remove from pending invites
                const updatedInvites = pendingInvites.filter(email => email !== userEmail);

                // Update campaign
                await updateDoc(doc(db, `users/${userDoc.id}/campaigns/${campaignDoc.id}`), {
                  members,
                  pendingInvites: updatedInvites.length > 0 ? updatedInvites : deleteField(),
                  updatedAt: serverTimestamp()
                });

                // Copy campaign to current user's campaigns
                const userCampaignRef = doc(db, `users/${currentUser.uid}/campaigns/${campaignDoc.id}`);
                await updateDoc(userCampaignRef, {
                  ...campaignData,
                  members,
                  pendingInvites: updatedInvites.length > 0 ? updatedInvites : deleteField(),
                  sharedCampaign: true,
                  originalOwner: userDoc.id
                });

                joined.push({
                  id: campaignDoc.id,
                  name: campaignData.name
                });
              } catch (error) {
                console.error('Error joining campaign:', error);
              }
            }
          }
        }

        if (joined.length > 0) {
          setJoinedCampaigns(joined);
        }
      } catch (error) {
        console.error('Error checking pending invites:', error);
      } finally {
        setChecking(false);
      }
    };

    checkPendingInvites();
  }, [currentUser]);

  return { checking, joinedCampaigns };
}
