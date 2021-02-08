import { Container, Flex, Text, useColorMode, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function RunningTimer(props) {
  const { colorMode } = useColorMode();
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [mins, setMins] = useState(props.sessionMins);
  const [time, setTime] = useState(props.sessionMins * 60);
  const [isRunning, setIsRunning] = useState(true);
  let ztime = props.sessionMins * 60;

  useEffect(() => {
    let id;
    if (isRunning) {
      id = window.setInterval(() => {
        const secondCounter = time % 60;
        const minuteCounter = Math.floor(time / 60);
        setSessionSeconds(secondCounter);
        setMins(minuteCounter);
        setTime((time) => time - 1);
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, [isRunning]);

  return (
    <Flex
      height="80%"
      color={colorMode === "light" ? "black" : "white"}
      justifyContent="center"
      alignItems="center">
      <Container h="100%" bg="transparent" centerContent>
        <Text
          m="5"
          fontSize="2xl"
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #000, #000)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          bgClip="text"
          fontWeight="extrabold">
          - {props.mode.toUpperCase()} -
        </Text>

        <Text fontSize="8xl">
          {mins} :{sessionSeconds < 10 ? "0" + sessionSeconds : sessionSeconds}
        </Text>
        <Button
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #F5F5F5, #FFFFFF)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          _hover={{ bg: "#5d0cff" }}
          onClick={() => setIsRunning(!isRunning)}>
          {"Pause"}
        </Button>
      </Container>
    </Flex>
  );
}

export default RunningTimer;