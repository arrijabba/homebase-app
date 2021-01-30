import {
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
  withTheme,
} from "@material-ui/core";

import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { ConnectWallet } from "./ConnectWallet";
import { Governance } from "./Governance";
import { SelectTemplate } from "./SelectTemplate";
import { TokenSettings } from "./TokenSettings";
import { DaoSettings } from "./DaoSettings";
import { Summary } from "./Summary";
import { Review } from "./Review";
import { useHistory } from "react-router-dom";
import { useConnectWallet } from "../../store/wallet/hook";
import ProgressBar from "react-customizable-progressbar";
import { TokenHolders } from "../../store/dao-info/types";
import { useOriginate } from "../../hooks/useOriginate";

const PageContainer = styled(withTheme(Grid))((props) => ({
  background: props.theme.palette.primary.main,
  minHeight: "100%",
}));

const StepContentContainer = styled(Grid)({
  paddingLeft: "16%",
  paddingRight: "16%",
  alignItems: "center",
  height: "inherit",
});

const StepOneContentContainer = styled(Grid)({
  paddingLeft: "16%",
  paddingRight: "16%",
  alignItems: "center",
});

const Footer = styled(withTheme(Grid))((props) => ({
  boxShadow: "none",
  background: props.theme.palette.primary.main,
  height: "inherit",
  paddingTop: "1%",
  borderTop: "2px solid #3D3D3D",
  marginLeft: "24.85%",
  borderLeft: "2px solid #3D3D3D",
}));

const BackButton = styled(Paper)({
  boxShadow: "none",
  width: "121px",
  height: 31,
  background: "inherit",
  color: "#fff",
  textAlign: "center",
  marginLeft: "4%",
  paddingTop: "1%",
  cursor: "pointer",
});

const NextButton = styled(Paper)({
  boxShadow: "none",
  minWidth: "121px",
  height: 31,
  borderRadius: 21,
  textAlign: "center",
  paddingTop: "1%",
  background: "inherit",
  float: "right",
  marginRight: "4%",
  cursor: "pointer",
  paddingLeft: "3%",
  paddingRight: "3%",
});

const WhiteText = styled(withTheme(Typography))((props) => ({
  color: props.theme.palette.secondary.main,
}));

const StyledStepper = styled(withTheme(Stepper))((props) => ({
  background: "inherit",
}));

const StepContentHeigth = styled(Grid)({
  height: "80vh",
});

const ContentContainer = styled(Grid)({
  height: "inherit",
  alignItems: "center",
  display: "flex",
});

const IndicatorValue = styled(withTheme(Paper))((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
  margin: "0 auto",
  fontSize: 25,
  color: props.theme.palette.text.secondary,
  userSelect: "none",
  boxShadow: "none",
  background: "inherit",
  fontFamily: "Roboto Mono",
}));

const ProgressContainer = styled(Grid)({
  borderRight: "2px solid #3D3D3D",
});

const STEPS = [
  "Select template",
  "Configure template",
  "Review information",
  "Launch organization",
];

const metadataCarrierParams = {
  keyName: "jaja",
  metadata: {
    frozenToken: {
      name: "J",
      symbol: "JAJA",
      decimals: 18,
    },
    unfrozenToken: {
      name: "J",
      symbol: "JAJA",
      decimals: 18,
    },
  },
};

export const DAOCreate: React.FC = () => {
  const [
    originateMetaData,
    { loading: loadingMetadataContract, data: carrierData },
  ] = useOriginate("MetadataCarrier", metadataCarrierParams);

  const [activeStep, setActiveStep] = React.useState(0);
  const [governanceStep, setGovernanceStep] = useState(0);
  const [handleNextStep, setHandleNextStep] = useState(() => undefined);
  const account = useSelector<AppState, AppState["wallet"]["address"]>(
    (state) => state.wallet.address
  );
  const [progress, setProgress] = useState(0.5);

  const daoInfo = useSelector<AppState, AppState["saveDaoInformationReducer"]>(
    (state) => state.saveDaoInformationReducer
  );
  const membersTokenAllocation = daoInfo.token_holders.map(
    (holder: TokenHolders) => {
      return {
        address: holder.token_holder,
        amount: holder.balance.toString(),
        tokenId: "1",
      };
    }
  );

  const [
    originateTreasury,
    { loading: loadingTrasuryData, data: treasuryData },
  ] = useOriginate("Treasury", {
    storage: {
      membersTokenAllocation,
      adminAddress: daoInfo.administrator,
      frozenScaleValue: 1,
      frozenExtraValue: 0,
      slashScaleValue: 1,
      slashDivisionValue: 1,
      minXtzAmount: 1,
      maxXtzAmount: daoInfo.max_agent!,
      maxProposalSize: 100,
      quorumTreshold: 4,
      votingPeriod:
        daoInfo.voting_hours! * 3600 +
        daoInfo.voting_days! * 24 * 3600 +
        daoInfo.voting_minutes! * 60,
    },
    metadataCarrierDeploymentData: {
      deployAddress: carrierData ? carrierData.address : "",
      keyName: "jaja",
    },
  });

  useEffect(() => {
    console.log("loading data ", loadingTrasuryData);
    if (treasuryData) {
      console.log("trasury data ", treasuryData);
    }
  }, [loadingTrasuryData, treasuryData]);

  const handleStep = () => {
    if (activeStep === 3) {
      originateMetaData();
    }

    setActiveStep(activeStep + 1);
  };

  useEffect(() => {
    if (carrierData) {
      originateTreasury();
    }
  }, [carrierData]);

  const history = useHistory<any>();

  function getStepContent(step: number, handleNextStep: any) {
    switch (step) {
      case 0:
        return (
          <SelectTemplate
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case 1:
        return governanceStep === 0 ? (
          <Governance
            setProgress={setProgress}
            defineSubmit={setHandleNextStep}
            setActiveStep={setActiveStep}
            setGovernanceStep={setGovernanceStep}
          />
        ) : governanceStep === 1 ? (
          <DaoSettings
            defineSubmit={setHandleNextStep}
            setActiveStep={setActiveStep}
          />
        ) : null;
      case 2:
        return (
          <TokenSettings
            setProgress={setProgress}
            defineSubmit={setHandleNextStep}
            setActiveStep={setActiveStep}
          />
        );
      case 3:
        return (
          <Summary
            setProgress={setProgress}
            setActiveStep={setActiveStep}
            setGovernanceStep={setGovernanceStep}
          />
        );
      case 4:
        return <Review setProgress={setProgress} />;
    }
  }

  const handleBackStep = () => {
    if (activeStep === 1 && governanceStep === 0) {
      return setActiveStep(0);
    } else if (activeStep === 1 && governanceStep !== 0) {
      return setGovernanceStep(governanceStep - 1);
    } else if (activeStep === 0) {
      history.push("/explorer");
    } else if (activeStep === 3 || activeStep === 2) {
      return setActiveStep(activeStep - 1);
    }
  };

  const { tezos } = useConnectWallet();

  return (
    <PageContainer container direction="row">
      <ProgressContainer
        item
        xs={3}
        container
        justify="center"
        alignItems="center"
        direction="column"
      >
        <ProgressBar
          progress={progress}
          radius={62}
          strokeWidth={4}
          strokeColor={"#81FEB7"}
          trackStrokeWidth={2}
          trackStrokeColor={"#3d3d3d"}
        >
          <div className="indicator">
            <IndicatorValue>{progress === 0.5 ? 0 : progress}%</IndicatorValue>
          </div>
        </ProgressBar>

        <StyledStepper activeStep={activeStep} orientation="vertical">
          {STEPS.map((label, index) => (
            <Step key={label} {...(!account && { active: false })}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </StyledStepper>
      </ProgressContainer>

      <StepContentHeigth item xs={9} container>
        <ContentContainer item xs={11}>
          {account ? (
            <StepContentContainer item container justify="center">
              {getStepContent(activeStep, handleNextStep)}
            </StepContentContainer>
          ) : (
            <StepOneContentContainer item container justify="center">
              <ConnectWallet />
            </StepOneContentContainer>
          )}
        </ContentContainer>
      </StepContentHeigth>
      {account && activeStep !== 3 && activeStep !== 4 ? (
        <Footer
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
            <BackButton onClick={handleBackStep}>
              <Typography>BACK </Typography>{" "}
            </BackButton>
          </Grid>

          {activeStep === 1 || activeStep === 2 ? (
            <Grid item xs={6}>
              <NextButton onClick={handleNextStep}>
                {" "}
                <WhiteText>CONTINUE</WhiteText>
              </NextButton>
            </Grid>
          ) : null}
        </Footer>
      ) : null}

      {!account ? (
        <Footer
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
            <BackButton onClick={() => history.push("/explorer")}>
              <Typography>BACK </Typography>{" "}
            </BackButton>
          </Grid>
        </Footer>
      ) : null}

      {activeStep === 3 ? (
        <Footer
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
            <BackButton onClick={handleBackStep}>
              <Typography>BACK</Typography>{" "}
            </BackButton>
          </Grid>
          <Grid item xs={6}>
            <NextButton onClick={handleStep}>
              {" "}
              <WhiteText>{"LAUNCH"}</WhiteText>
            </NextButton>
          </Grid>
        </Footer>
      ) : null}
    </PageContainer>
  );
};
