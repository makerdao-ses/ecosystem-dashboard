import React from 'react';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';

interface Props {
  actor: EcosystemActor;
}
export const ActorAboutContainer: React.FC<Props> = ({ actor }) => {
  console.log('actors', actor);
  return (
    <div style={{ marginTop: 64 }}>
      <div>Header</div>
      <div>MainContent</div>
    </div>
  );
};

export default ActorAboutContainer;
