import React from 'react';

import { Bar } from 'react-chartjs-2';

import { Box, Flex, Text, Center } from '@chakra-ui/react';

function getChartData() {
  let data = {
    heart_health: {
      totals: {
        boys: '9',
        girls: '5',
        total: '14',
      },
      counts: {
        boys: '7',
        girls: '2',
        total: '9',
      },
    },
    body_health: {
      totals: {
        boys: '9',
        girls: '5',
        total: '14',
      },
      counts: {
        boys: '4',
        girls: '3',
        total: '7',
      },
    },
    upper_body: {
      totals: {
        boys: '10',
        girls: '10',
        total: '20',
      },
      counts: {
        boys: '5',
        girls: '6',
        total: '11',
      },
    },
    adbominal: {
      totals: {
        boys: '6',
        girls: '2',
        total: '8',
      },
      counts: {
        boys: '2',
        girls: '1',
        total: '3',
      },
    },
    trunk_extensor: {
      totals: {
        boys: '5',
        girls: '2',
        total: '7',
      },
      counts: {
        boys: '5',
        girls: '2',
        total: '7',
      },
    },
    flexibility: {
      totals: {
        boys: '3',
        girls: '2',
        total: '5',
      },
      counts: {
        boys: '2',
        girls: '1',
        total: '3',
      },
    },
  };

  let lables = [];
  let dataset = [];
  let NI_HR = [];

  for (let x in data) {
    lables.push(...Object.keys(data[x]['counts']));

    let totals = Object.values(data[x]['totals']);
    let counts = Object.values(data[x]['counts']);

    for (let i in counts) {
      let t = parseFloat(totals[i]);
      let c = parseFloat(counts[i]);
      let p = (c / t) * 100;
      dataset.push(parseInt(p));

      NI_HR.push(100 - parseInt(p));
    }
  }

  return { lables, dataset };
}

const ReportGraph = () => {
  let chartData = getChartData();
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        scales: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: function (val, index) {
            return index % 2 === 0 ? this.getLabelForValue(val) + '%' : '';
          },
        },
      },
    },
    layout: {
      padding: {
        left: 50,
        bottom: 50,
      },
    },

    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 1,
        },
      },
    },
  };

  const data = {
    labels: chartData.lables,
    datasets: [
      {
        label: '',
        data: chartData.dataset,
        background: ['#1DA2D5', '#80BDAD', '#4FA446'],
        barThickness: 40,
      },
    ],
  };

  return (
    <>
      <>
        <Box h='50vh'>
          <Bar options={options} data={data} />
        </Box>
        <Flex marginTop='3' marginLeft='2'>
          <Box
            background='#E8EAE9'
            w='14rem'
            h='3rem'
            p='3'
            fontSize='1rem'
          >
            <Center>
              <Text>Heart Health</Text>
            </Center>
          </Box>
          <Box
            background='#E8EAE9'
            w='14rem'
            h='3rem'
            p='3'
            fontSize='1rem'
            marginLeft='2'
          >
            <Center>
              <Text>Body Health</Text>
            </Center>
          </Box>
          <Box
            background='#E8EAE9'
            w='73rem'
            h='3rem'
            p='3'
            fontSize='1rem'
            marginLeft='2'
          >
            <Center>
              <Text>Muscle Fitness</Text>
            </Center>
          </Box>
        </Flex>

        <Flex>
          <Box marginLeft='10' p='2'>
            <Text textStyle='h4'>Aerobic Capacity</Text>
          </Box>
          <Box marginLeft='20' p='2'>
            <Text textStyle='h4'>Body Composition</Text>
          </Box>
          <Flex marginLeft='15rem'>
            <Box p='2'>
              <Text textStyle='h4' marginLeft='10'>
                Upper Body
              </Text>
              <Text>Strength/Endurance</Text>
            </Box>
            <Box p='2' marginLeft='10'>
              <Text textStyle='h4' marginLeft='10'>
                Abdominal
              </Text>
              <Text>Strength/Endurance</Text>
            </Box>
            <Box p='2' marginLeft='12'>
              <Text textStyle='h4'>Trunk Extensor</Text>
              <Text marginLeft='5'>Strength</Text>
            </Box>
            <Box p='2' marginLeft='10'>
              <Text textStyle='h4'>Flexibility</Text>
            </Box>
          </Flex>
        </Flex>
      </>
    </>
  );
};

export default ReportGraph;
