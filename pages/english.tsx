import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCurrencyData } from "../helper/coinCurrenctyHelper";
import { newsContent } from "../helper/translateHelper";

function English() {
  const { locale } = useRouter();
  // @ts-ignore
  const { title, description } = newsContent[locale!];

  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const curentlyData = await getCurrencyData().then((data) => data.USDBRL);

      const code = curentlyData?.code as string;
      const bid = curentlyData?.bid as string;

      const calc = Number(bid) * 1000;

      setAmount(`${calc} ` + code);
    };

    fetchData();
  }, []);
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="1400px"
      m="auto"
      py={10}
    >
      <Text align="center">Current Language:</Text>
      <Text align="center" fontWeight={"bold"}>
        {locale}
      </Text>

      <Flex pt={"20px"} gap={"20px"}>
        <Link
          className={locale === "es-ES" ? "active" : ""}
          href={"/spanish"}
          locale="es-ES"
        >
          <Button colorScheme={"brand"}>es-ES</Button>
        </Link>
        <Link
          className={locale === "en-US" ? "active" : ""}
          href={"/english"}
          locale="en-US"
        >
          <Button colorScheme={"brand"}>en-US</Button>
        </Link>
        <Link
          className={locale === "pt-BR" ? "active" : ""}
          href={"/"}
          locale="pt-BR"
        >
          <Button colorScheme={"brand"}>pt-BR</Button>
        </Link>
      </Flex>
      <Flex
        position="relative"
        flexDirection="column"
        height={"500px"}
        border="1px"
        rounded="2xl"
        p="24px"
        mt="40px"
        gap="20px"
        borderColor={"inherit"}
        align={"center"}
      >
        <Text>{title}</Text>
        <Text>{description}</Text>

        <SingleDatepicker
          name="date-input"
          date={date}
          onDateChange={setDate}
          configs={{
            dateFormat: "MM-dd-yyyy",
            dayNames: "MTWTFSS".split(""), // length of 7
            monthNames: "JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC".split(
              ","
            ), // length of 12
          }}
        />
        <Text fontWeight={"bold"}>
          We convert this amount on local money: 1000 BRL
        </Text>
        <Text fontWeight={"bold"} fontSize={28}>
          {amount}
        </Text>
      </Flex>
    </Container>
  );
}

export default English;
