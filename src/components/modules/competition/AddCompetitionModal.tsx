import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {
  DialogBody,
  DialogHeader,
} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import RenderWhen from "@/components/common/RenderWhen";
import { NewCompetitionPostRequest } from "@/api/@types/competition";
import { ApiPostAxios } from "@/api/client/ApiPost";
import { PostNewCompetition } from "@/api/client/routes";
import { useUser } from "@auth0/nextjs-auth0/client";

interface FormikData {
  name: string;
  competitor: string;
  competitors: string[];
  win: number;
  loss: number;
  draw: number;
}

const initialValues: FormikData = {
  name: "",
  competitor: "",
  competitors: [],
  win: 1,
  loss: 0,
  draw: 0.5,
};

const validationSchema = yup.object({
  name: yup.string().required(),
  competitors: yup
    .array<String>()
    .min(4)
    .max(8)
    .test({
      name: "unique",
      message: "All competitors must be unique",
      test: (value) => {
        if (!value) return false;
        const set = new Set(value);
        return set.size === value.length;
      },
    })
    .required(),
  competitor: yup.string(),
  win: yup.number().required(),
  loss: yup.number().required(),
  draw: yup.number().required(),
});

interface IAddCompetitionModal {
  open: boolean;
  handleClose: () => void;
}

const AddCompetitionModal = ({ open, handleClose }: IAddCompetitionModal) => {
  const { checkSession } = useUser();

  const onFormikSubmit = async (
    values: FormikData,
    actions: FormikHelpers<FormikData>,
  ) => {
    await checkSession();

    const data: NewCompetitionPostRequest = {
      name: values.name,
      competitors: values.competitors,
      win: values.win,
      loss: values.loss,
      draw: values.draw,
    };

    const response = await ApiPostAxios(data, PostNewCompetition);
    if (response.status === 200) {
      handleClose();
      return;
    }

    actions.setSubmitting(false);

    if (response.status === 400) {
      actions.setFieldError("name", "Competition name already exists");
      return;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="addcompetition-modal-title"
      fullWidth
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onFormikSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          errors,
          handleReset,
          setFieldError,
        }) => (
          <>
            <DialogHeader>
              <DialogContent>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Typography variant={"h5"}> New Competition </Typography>
                  <IconButton
                    onClick={() => {
                      handleReset();
                      handleClose();
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              </DialogContent>
            </DialogHeader>
            <Divider />

            <DialogBody>
              <DialogContent>
                <Stack
                  direction={"column"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                  width={"100%"}
                  gap={"1.5rem"}
                >
                  <TextField
                    label={"Name"}
                    name={"name"}
                    value={values.name}
                    onChange={handleChange}
                    size={"medium"}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth={true}
                  />
                  <Box width={"100%"}>
                    <Typography variant={"body2"} display={"inline-block"}>
                      Competitors:{" "}
                    </Typography>
                    <RenderWhen condition={values.competitors.length === 0}>
                      <Typography
                        variant={"body2"}
                        color={"primary"}
                        display={"inline-block"}
                        marginLeft={"0.5rem"}
                      >
                        Add at least 4 competitors
                      </Typography>
                    </RenderWhen>
                    {values.competitors.map((competitor) => (
                      <Chip
                        key={competitor}
                        label={competitor}
                        color={"primary"}
                        sx={{ display: "inline-flex", margin: "0.25rem" }}
                        onDelete={() => {
                          setFieldValue(
                            "competitors",
                            values.competitors.filter((c) => c !== competitor),
                          );
                          setFieldError("competitors", "");
                        }}
                      />
                    ))}
                    <Stack
                      direction={"row"}
                      gap={"0.5rem"}
                      width={"100%"}
                      alignItems={"center"}
                      mt={"0.5rem"}
                    >
                      <TextField
                        label={"Enter a new competitor"}
                        name={"competitor"}
                        value={values.competitor}
                        onChange={handleChange}
                        size={"medium"}
                        fullWidth
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            if (values.competitor === "") return;
                            if (values.competitors.length === 8) {
                              setFieldError(
                                "competitors",
                                "Maximum 8 competitors",
                              );
                              return;
                            }
                            if (
                              values.competitors.includes(values.competitor)
                            ) {
                              setFieldError("competitors", "Already added");
                              return;
                            }
                            setFieldValue("competitors", [
                              ...values.competitors,
                              values.competitor,
                            ]);
                            setFieldValue("competitor", "");
                            setFieldError("competitors", "");
                          }
                        }}
                        error={!!errors.competitors}
                        helperText={errors.competitors}
                      />
                      <IconButton
                        onClick={() => {
                          if (values.competitor === "") return;
                          if (values.competitors.length === 8) {
                            setFieldError(
                              "competitors",
                              "Maximum 8 competitors",
                            );
                            return;
                          }
                          if (values.competitors.includes(values.competitor)) {
                            setFieldError("competitors", "Already added");
                            return;
                          }
                          setFieldValue("competitors", [
                            ...values.competitors,
                            values.competitor,
                          ]);
                          setFieldValue("competitor", "");
                          setFieldError("competitors", "");
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                  <Stack
                    direction={"row"}
                    gap={"0.5rem"}
                    width={"100%"}
                    alignItems={"center"}
                  >
                    <TextField
                      label={"Win"}
                      name={"win"}
                      value={values.win}
                      onChange={handleChange}
                      size={"small"}
                      type={"number"}
                      error={!!errors.win}
                      helperText={errors.win}
                    />
                    <Divider orientation={"vertical"} flexItem />
                    <TextField
                      label={"Loss"}
                      name={"loss"}
                      value={values.loss}
                      onChange={handleChange}
                      size={"small"}
                      type={"number"}
                      error={!!errors.loss}
                      helperText={errors.loss}
                    />
                    <Divider orientation={"vertical"} flexItem />
                    <TextField
                      label={"Draw"}
                      name={"draw"}
                      value={values.draw}
                      onChange={handleChange}
                      size={"small"}
                      type={"number"}
                      error={!!errors.draw}
                      helperText={errors.draw}
                    />
                  </Stack>
                </Stack>
              </DialogContent>
            </DialogBody>
            <DialogActions>
              <Button
                variant={"outlined"}
                onClick={() => {
                  handleReset();
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                variant={"contained"}
                type={"submit"}
                onClick={() => handleSubmit()}
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddCompetitionModal;
