interface ColorScheme {
  borderColor: string;
  background: string;
  borderColorDark: string;
  backgroundDark: string;
}

export interface RoleColors {
  All: ColorScheme;
  ActiveEcosystemActor: ColorScheme;
  ScopeFacilitator: ColorScheme;
  AdvisoryCouncilMember: ColorScheme;
  Facilitator: ColorScheme;
  ResearchExpert: ColorScheme;
  ProjectLead: ColorScheme;
  DataExpert: ColorScheme;
  TechExpert: ColorScheme;
  TeamLead: ColorScheme;
}

const useRoleColors = () => {
  const colors: RoleColors = {
    All: {
      borderColor: 'rgba(111, 122, 133, 0.8)',
      background: 'rgba(111, 122, 133, 0.2)',
      borderColorDark: 'rgba(50, 55, 59, 0.4)',
      backgroundDark: 'rgba(50, 55, 59, 0.2)',
    },
    ActiveEcosystemActor: {
      borderColor: 'rgba(102, 181, 255, 0.8)',
      background: 'rgba(102, 181, 255, 0.2)',
      borderColorDark: 'rgba(0, 132, 255, 0.4)',
      backgroundDark: 'rgba(0, 132, 255, 0.2)',
    },
    ScopeFacilitator: {
      borderColor: 'rgba(255, 130, 161, 0.8)',
      background: 'rgba(255, 130, 161, 0.2)',
      borderColorDark: 'rgba(241, 0, 61, 0.4)',
      backgroundDark: 'rgba(241, 0, 61, 0.2)',
    },
    AdvisoryCouncilMember: {
      borderColor: 'rgba(122, 214, 147, 0.8)',
      background: 'rgba(122, 214, 147, 0.2)',
      borderColorDark: 'rgba(52, 168, 83, 0.4)',
      backgroundDark: 'rgba(52, 168, 83, 0.2)',
    },
    Facilitator: {
      borderColor: 'rgba(166, 227, 182, 0.8)',
      background: 'rgba(166, 227, 182, 0.2)',
      borderColorDark: 'rgba(122, 214, 147, 0.4)',
      backgroundDark: 'rgba(122, 214, 147, 0.2)',
    },
    ResearchExpert: {
      borderColor: 'rgba(188, 153, 242, 0.8)',
      background: 'rgba(188, 153, 242, 0.2)',
      borderColorDark: 'rgba(142, 85, 234, 0.4)',
      backgroundDark: 'rgba(142, 85, 234, 0.2)',
    },
    ProjectLead: {
      borderColor: 'rgba(254, 185, 103, 0.8)',
      background: 'rgba(254, 185, 103, 0.2)',
      borderColorDark: 'rgba(122, 214, 147, 0.4)',
      backgroundDark: 'rgba(122, 214, 147, 0.2)',
    },
    DataExpert: {
      borderColor: 'rgba(210, 187, 247, 0.8)',
      background: 'rgba(210, 187, 247, 0.2)',
      borderColorDark: 'rgba(188, 153, 242, 0.4)',
      backgroundDark: 'rgba(188, 153, 242, 0.2)',
    },
    TechExpert: {
      borderColor: 'rgba(249, 199, 193, 0.8)',
      background: 'rgba(249, 199, 193, 0.2)',
      borderColorDark: 'rgba(244, 161, 154, 0.4)',
      backgroundDark: 'rgba(244, 161, 154, 0.2)',
    },
    TeamLead: {
      borderColor: 'rgba(244, 161, 154, 0.8)',
      background: 'rgba(244, 161, 154, 0.2)',
      borderColorDark: 'rgba(234, 67, 53, 0.4)',
      backgroundDark: 'rgba(234, 67, 53, 0.2)',
    },
  };

  return colors;
};

export default useRoleColors;
