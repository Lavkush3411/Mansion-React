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

const steps = ["Initiated", "Accepted", "Transit", "Delivered"];

function HorizontalStepper({ state }: { state: string }) {
  const { activeStep } = useSteps({
    index: steps.indexOf(state) + 1,
    count: steps.length,
  });

  return (
    <Stack>
      <Stepper size="xs" index={activeStep} colorScheme="gray" gap="0">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator borderColor={"gray"}>
              <StepStatus complete={<StepIcon borderColor={"gray"} />} />
            </StepIndicator>
            <Text color={"black"} fontWeight={"600"} fontSize={"x-small"}>
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
