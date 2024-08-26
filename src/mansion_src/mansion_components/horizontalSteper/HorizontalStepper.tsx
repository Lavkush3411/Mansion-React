import {
  Box,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  Stepper,
  Text,
} from "@chakra-ui/react";

export const steps = ["Initiated", "Accepted", "Transit", "Delivered"];

function HorizontalStepper({ state }: { state: number }) {
  return (
    <Stack>
      <Stepper size="xs" index={state} colorScheme="gray" gap="0">
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
