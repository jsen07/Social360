import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OnboardingState = {
  fullname: string;
  userRole: string;
  businessName: string;
  businessType: string;
  numberOfLocations: string;
  teamSize: string;
};

const initialState: OnboardingState = {
  fullname: "",
  userRole: "",
  businessName: "",
  businessType: "",
  numberOfLocations: "",
  teamSize: "",
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setFullname: (state, action: PayloadAction<string>) => {
      state.fullname = action.payload;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
    setBusinessName: (state, action: PayloadAction<string>) => {
      state.businessName = action.payload;
    },
    setBusinessType: (state, action: PayloadAction<string>) => {
      state.businessType = action.payload;
    },
    setNumberOfLocations: (state, action: PayloadAction<string>) => {
      state.numberOfLocations = action.payload;
    },
    setTeamSize: (state, action: PayloadAction<string>) => {
      state.teamSize = action.payload;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  setFullname,
  setUserRole,
  setBusinessName,
  setBusinessType,
  setNumberOfLocations,
  setTeamSize,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
