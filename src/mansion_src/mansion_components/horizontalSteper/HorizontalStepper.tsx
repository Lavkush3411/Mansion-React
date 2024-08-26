import {
  Box,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";

const steps = ["first", "second", "third"];

function HorizontalStepper() {
  const { activeStep, setActiveStep } = useSteps({
    index: 2,
    count: steps.length,
  });

  return (
    <Stack>
      <Stepper size="sm" index={activeStep} colorScheme="gray" gap="0">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator borderColor={"gray"}>
              <StepStatus complete={<StepIcon borderColor={"gray"} />} />
            </StepIndicator>
            <Text color={"black"} fontWeight={"400"}>
              {step}
            </Text>
            <Box width={"100%"} borderBottom={"1px solid gray"}></Box>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

export default HorizontalStepper;
