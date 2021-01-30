import {
  Grid,
  styled,
  Typography,
  withStyles,
  InputAdornment,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../../../store";
import { saveDaoInformation } from "../../../store/dao-info/action";
import { Field, FieldArray, Form, Formik } from "formik";
import { TextField as FormikTextField } from "formik-material-ui";
import { TokenHolders } from "../../../store/dao-info/types";
import { CreatorContext } from "../state/context";
import { ActionTypes } from "../state/types";

interface Values {
  max_agent: number | undefined;
  administrator: string | undefined;
  token_holders: Array<TokenHolders>;
}

const CustomTypography = styled(Typography)({
  paddingBottom: 21,
  borderBottom: "1px solid #3D3D3D",
  marginTop: 10,
  marginBottom: 14,
});

const SecondContainer = styled(Grid)({
  marginTop: 25,
});

const CustomInputContainer = styled(Grid)({
  border: "1px solid #3D3D3D",
  height: 62,
  marginTop: 14,
  padding: "18px 21px",
  boxSizing: "border-box",
  "&:hover": {
    background: "rgba(129, 254, 183, 0.03)",
    borderLeft: "2px solid #81FEB7",
  },
});

const CustomBalanceContainer = styled(Grid)({
  border: "1px solid #3D3D3D",
  height: 62,
  marginTop: 14,
  borderLeft: "none",
  padding: "18px 21px",
  boxSizing: "border-box",
  "&:hover": {
    background: "rgba(129, 254, 183, 0.03)",
    borderLeft: "2px solid #81FEB7",
  },
});

const ErrorText = styled(Typography)({
  fontSize: 10,
  color: "red",
  marginTop: 10,
});

const CustomFormikTextField = withStyles({
  root: {
    "& .MuiInput-root": {
      fontWeight: 300,
      textAlign: "initial",
    },
    "& .MuiInputBase-input": {
      textAlign: "initial",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none !important",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "none !important",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none !important",
    },
  },
})(FormikTextField);

const CustomTotalContainer = styled(Typography)({
  padding: "11px 21px",
  boxSizing: "border-box",
});

const CustomValueContainer = styled(Typography)({
  padding: "11px 21px",
  boxSizing: "border-box",
  fontWeight: 700,
});

const AddButon = styled("button")({
  background: "inherit",
  border: "none",
  outline: "none",
  marginTop: 8,
  textAlign: "end",
  width: "100%",
  cursor: "pointer",
  textDecoration: "underline",
  color: "#fff",
});

const TokenHoldersGrid = styled(Grid)({
  maxHeight: 269,
  overflowX: "scroll",
});

const TokenSettingsForm = ({ values, submitForm, touched, errors }: any) => {
  const dispatch = useContext(CreatorContext).dispatch;

  useEffect(() => {
    if (values) {
      dispatch({
        type: ActionTypes.UPDATE_HANDLER,
        handler: (values: any) => submitForm(values),
      });
    }
  }, [dispatch, submitForm, values]);

  const getTotal = () => {
    let total = 0;
    values.token_holders.forEach((holder: any) => {
      total += holder.balance;
      return;
    });
    return total;
  };
  return (
    <>
      <TokenHoldersGrid container direction="row">
        <Grid item xs={9}>
          <Typography variant="subtitle1" color="textSecondary">
            {" "}
            Token holder{" "}
          </Typography>

          <FieldArray
            name="token_holders"
            render={() => (
              <>
                {values.token_holders && values.token_holders.length > 0
                  ? values.token_holders.map((holder: any, index: any) => (
                      <div key={index}>
                        {/* <Typography variant="subtitle1"> Token holder </Typography> */}
                        <CustomInputContainer>
                          <Field
                            type="text"
                            component={CustomFormikTextField}
                            placeholder="0xf8s8d...."
                            name={`token_holders.${index}.token_holder`}
                          />
                          {/* {errors.token_holders &&
                          errors.token_holders[index] &&
                          touched.token_holders[index] ? (
                            <ErrorText>{errors.token_holders[index]}</ErrorText>
                          ) : null} */}
                        </CustomInputContainer>
                      </div>
                    ))
                  : null}
              </>
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1" color="textSecondary">
            {" "}
            Balance{" "}
          </Typography>

          <FieldArray
            name="token_holders"
            render={(arrayHelpers) => (
              <>
                {values.token_holders && values.token_holders.length > 0
                  ? values.token_holders.map((holder: any, index: any) => (
                      <div key={index}>
                        <CustomBalanceContainer>
                          <Field
                            type="number"
                            component={CustomFormikTextField}
                            placeholder="0.00"
                            name={`token_holders.${index}.balance`}
                          />
                        </CustomBalanceContainer>
                        {index + 1 === values.token_holders.length ? (
                          <AddButon
                            className="button"
                            type="button"
                            onClick={() =>
                              arrayHelpers.insert(index + 1, {
                                token_holder: "",
                                balance: 0,
                              })
                            }
                          >
                            {" "}
                            Add new row
                          </AddButon>
                        ) : null}
                      </div>
                    ))
                  : null}
              </>
            )}
          />
        </Grid>
      </TokenHoldersGrid>

      <Grid container direction="row">
        <Grid item xs={9}>
          <CustomTotalContainer variant="subtitle1" color="textSecondary">
            {" "}
            Total{" "}
          </CustomTotalContainer>
        </Grid>
        <Grid item xs={3}>
          <CustomValueContainer color="textSecondary">
            {getTotal()}
          </CustomValueContainer>
        </Grid>
      </Grid>

      <SecondContainer item container direction="row" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">
            {" "}
            Maximum Agent Spend Per Cycle{" "}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <CustomInputContainer>
            <Field
              component={CustomFormikTextField}
              type="number"
              name="max_agent"
              placeholder="00"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">TKN</InputAdornment>
                ),
              }}
            />
          </CustomInputContainer>
          {errors.max_agent && touched.max_agent ? (
            <ErrorText>{errors.max_agent}</ErrorText>
          ) : null}
        </Grid>
      </SecondContainer>

      <SecondContainer item container direction="row" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">
            {" "}
            Administrator{" "}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomInputContainer>
            <Field
              name="administrator"
              type="text"
              placeholder="0xf8s8d...."
              component={CustomFormikTextField}
            ></Field>
          </CustomInputContainer>
          {errors.administrator && touched.administrator ? (
            <ErrorText>{errors.administrator}</ErrorText>
          ) : null}
        </Grid>
      </SecondContainer>
    </>
  );
};

export const TokenSettings = (): JSX.Element => {
  const storageDaoInformation = useSelector<
    AppState,
    AppState["saveDaoInformationReducer"]
  >((state) => state.saveDaoInformationReducer);

  const dispatch = useDispatch();
  const { dispatch: creatorDispatch } = useContext(CreatorContext);
  const saveStepInfo = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    dispatch(saveDaoInformation(values));
    creatorDispatch({ type: ActionTypes.UPDATE_STEP, step: 3 });
  };

  const validate = (values: Values) => {
    const errors: any = {};

    if (values.administrator === undefined || !String(values.administrator)) {
      errors.administrator = "Required";
    }

    if (values.max_agent === undefined || !String(values.max_agent)) {
      errors.max_agent = "Required";
    }

    return errors;
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        style={{ height: "fit-content" }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="textSecondary">
            Distribution Settings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography variant="subtitle1" color="textSecondary">
            These settings will define the name, symbol, and initial
            distribution of your token.
          </CustomTypography>
        </Grid>
      </Grid>
      <Formik
        enableReinitialize={true}
        validate={validate}
        onSubmit={saveStepInfo}
        initialValues={storageDaoInformation}
      >
        {({
          submitForm,
          isSubmitting,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          return (
            <Form style={{ width: "100%" }}>
              <TokenSettingsForm
                defineSubmit={() => undefined}
                validate={validate}
                submitForm={submitForm}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                values={values}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};