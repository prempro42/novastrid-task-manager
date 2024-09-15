import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../features/tasksSlice";
import { AppDispatch, RootState } from "../../store";
import TaskFilters from "./TaskFilters";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TaskManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Box maxW="md" mx="auto" p={4} bg="white" borderRadius="md" boxShadow="md">
      <Flex align="center" mb={4}>
        <Heading as="h1" size="xl" fontWeight="bold">
          Task Manager
        </Heading>
        {loading && <Spinner ml={4} mt={2} />}
      </Flex>
      <TaskForm />
      {error && <Text>Error: {error}</Text>}
      <TaskFilters />
      <TaskList />
    </Box>
  );
};

export default TaskManager;
