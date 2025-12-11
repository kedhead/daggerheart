import { useState } from 'react';
import WizardProgress from './wizard/WizardProgress';
import StepNavigation from './wizard/StepNavigation';
import PitchStep from './wizard/steps/PitchStep';
import ToneFeelStep from './wizard/steps/ToneFeel Step';
import ThemesStep from './wizard/steps/ThemesStep';
import TouchstonesStep from './wizard/steps/TouchstonesStep';
import OverviewStep from './wizard/steps/OverviewStep';
import CommunitiesStep from './wizard/steps/CommunitiesStep';
import AncestriesStep from './wizard/steps/AncestriesStep';
import ClassesStep from './wizard/steps/ClassesStep';
import PlayerPrinciplesStep from './wizard/steps/PlayerPrinciplesStep';
import GMPrinciplesStep from './wizard/steps/GMPrinciplesStep';
import DistinctionsStep from './wizard/steps/DistinctionsStep';
import IncitingIncidentStep from './wizard/steps/IncitingIncidentStep';
import CampaignMechanicsStep from './wizard/steps/CampaignMechanicsStep';
import SessionZeroStep from './wizard/steps/SessionZeroStep';
import { useAPIKey } from '../../hooks/useAPIKey';
import { CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { generateCampaignContent } from '../../services/campaignGenerator';
import './CampaignBuilder.css';

export default function CampaignBuilderWizard({
  userId,
  campaign,
  campaignFrame,
  wizardState,
  onComplete,
  addNPC,
  addLocation,
  addLore,
  addEncounter,
  addTimelineEvent
}) {
  const { hasKey, keys } = useAPIKey(userId);
  const {
    currentStep,
    completedSteps,
    data,
    updateData,
    goToStep,
    nextStep,
    previousStep,
    saveDraft,
    complete,
    canProceed,
    isComplete
  } = wizardState;

  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [generationComplete, setGenerationComplete] = useState(false);

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await saveDraft();
    } catch (err) {
      console.error('Failed to save draft:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async () => {
    setGenerating(true);

    try {
      // Save the campaign frame first
      setGenerationProgress('Saving campaign frame...');
      await complete();

      // Generate campaign content
      setGenerationProgress('Generating NPCs...');
      const apiKey = hasKey('anthropic') ? keys.anthropic : (hasKey('openai') ? keys.openai : null);
      const provider = hasKey('anthropic') ? 'anthropic' : 'openai';

      const generatedContent = await generateCampaignContent(data, campaign, apiKey, provider);

      // Save NPCs
      setGenerationProgress(`Saving ${generatedContent.npcs.length} NPCs...`);
      for (const npc of generatedContent.npcs) {
        await addNPC(npc);
      }

      // Save Locations
      setGenerationProgress(`Saving ${generatedContent.locations.length} locations...`);
      for (const location of generatedContent.locations) {
        await addLocation(location);
      }

      // Save Lore
      setGenerationProgress(`Saving ${generatedContent.lore.length} lore entries...`);
      for (const lore of generatedContent.lore) {
        await addLore(lore);
      }

      // Save Encounters
      setGenerationProgress(`Saving ${generatedContent.encounters.length} encounters...`);
      for (const encounter of generatedContent.encounters) {
        await addEncounter(encounter);
      }

      // Save Timeline Events
      setGenerationProgress(`Saving ${generatedContent.timelineEvents.length} timeline events...`);
      for (const event of generatedContent.timelineEvents) {
        await addTimelineEvent(event);
      }

      setGenerationProgress('Complete!');
      setGenerationComplete(true);

      // Give user a moment to see the success message
      setTimeout(() => {
        setGenerating(false);
        if (onComplete) {
          onComplete();
        }
      }, 2000);
    } catch (error) {
      console.error('Error generating campaign content:', error);
      setGenerationProgress(`Error: ${error.message}`);
      setTimeout(() => {
        setGenerating(false);
        if (onComplete) {
          onComplete();
        }
      }, 3000);
    }
  };

  // Show generating screen
  if (generating) {
    return (
      <div className="campaign-builder-view" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        {!generationComplete ? (
          <>
            <Loader2 size={64} style={{ color: 'var(--hope-color)', margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
            <h2>Generating Your Campaign...</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              {generationProgress}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              This may take a few moments. We're creating NPCs, locations, lore, encounters, and timeline events based on your campaign frame.
            </p>
          </>
        ) : (
          <>
            <Sparkles size={64} style={{ color: 'var(--hope-color)', margin: '0 auto 1rem' }} />
            <h2>Campaign Generated!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Your campaign is ready to play! Check out the NPCs, Locations, Lore, and other sections to see your generated content.
            </p>
          </>
        )}
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="campaign-builder-view" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <CheckCircle size={64} style={{ color: 'var(--success-color)', margin: '0 auto 1rem' }} />
        <h2>Campaign Frame Complete!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Your campaign frame has been saved and is now available throughout your campaign.
        </p>
        <button className="btn btn-primary" onClick={onComplete}>
          Back to Campaign
        </button>
      </div>
    );
  }

  // Render current step
  const renderStep = () => {
    const stepProps = {
      value: getStepData(currentStep, data),
      onChange: (value) => updateData(getStepKey(currentStep), value),
      campaign,
      userId,
      hasAPIKey: hasKey()
    };

    switch (currentStep) {
      case 0:
        return <PitchStep {...stepProps} />;
      case 1:
        return <ToneFeelStep {...stepProps} />;
      case 2:
        return <ThemesStep {...stepProps} />;
      case 3:
        return <TouchstonesStep {...stepProps} />;
      case 4:
        return <OverviewStep {...stepProps} />;
      case 5:
        return <CommunitiesStep {...stepProps} />;
      case 6:
        return <AncestriesStep {...stepProps} />;
      case 7:
        return <ClassesStep {...stepProps} />;
      case 8:
        return <PlayerPrinciplesStep {...stepProps} />;
      case 9:
        return <GMPrinciplesStep {...stepProps} />;
      case 10:
        return <DistinctionsStep {...stepProps} />;
      case 11:
        return <IncitingIncidentStep {...stepProps} />;
      case 12:
        return <CampaignMechanicsStep {...stepProps} />;
      case 13:
        return <SessionZeroStep {...stepProps} />;
      default:
        return null;
    }
  };

  // Review step (after step 13)
  if (currentStep === 14) {
    return (
      <div className="campaign-builder-view">
        <WizardProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={goToStep}
        />

        <div className="wizard-step">
          <div className="step-header">
            <h2>Review & Complete</h2>
            <p className="step-description">Review your campaign frame and complete the wizard.</p>
          </div>

          <div className="step-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card">
                <h3>Campaign Frame Summary</h3>
                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                  <div>
                    <strong>Pitch:</strong>
                    <p style={{ marginTop: '0.25rem' }}>{data.pitch || 'Not set'}</p>
                  </div>
                  <div>
                    <strong>Tone & Feel:</strong>
                    <p style={{ marginTop: '0.25rem' }}>{data.toneAndFeel.length > 0 ? data.toneAndFeel.join(', ') : 'Not set'}</p>
                  </div>
                  <div>
                    <strong>Themes:</strong>
                    <p style={{ marginTop: '0.25rem' }}>{data.themes.length > 0 ? data.themes.join(', ') : 'Not set'}</p>
                  </div>
                  <div>
                    <strong>Touchstones:</strong>
                    <p style={{ marginTop: '0.25rem' }}>{data.touchstones.length > 0 ? data.touchstones.join(', ') : 'Not set'}</p>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleComplete}
                style={{ alignSelf: 'center', fontSize: '1.125rem', padding: '1rem 2rem' }}
              >
                <CheckCircle size={24} />
                Complete Campaign Frame
              </button>
            </div>
          </div>
        </div>

        <StepNavigation
          currentStep={currentStep}
          totalSteps={15}
          canProceed={true}
          onPrevious={previousStep}
          onNext={handleComplete}
          onSaveDraft={handleSaveDraft}
          saving={saving}
        />
      </div>
    );
  }

  return (
    <div className="campaign-builder-view">
      <WizardProgress
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={goToStep}
      />

      {renderStep()}

      <StepNavigation
        currentStep={currentStep}
        totalSteps={14}
        canProceed={canProceed()}
        onPrevious={previousStep}
        onNext={nextStep}
        onSaveDraft={handleSaveDraft}
        saving={saving}
      />
    </div>
  );
}

// Helper functions
function getStepKey(stepIndex) {
  const keys = [
    'pitch',
    'toneAndFeel',
    'themes',
    'touchstones',
    'overview',
    'communities',
    'ancestries',
    'classes',
    'playerPrinciples',
    'gmPrinciples',
    'distinctions',
    'incitingIncident',
    'campaignMechanics',
    'sessionZeroQuestions'
  ];
  return keys[stepIndex];
}

function getStepData(stepIndex, data) {
  return data[getStepKey(stepIndex)];
}
