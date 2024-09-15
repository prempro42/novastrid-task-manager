import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import {
  fetchTasks,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  setFilter,
} from "./features/tasksSlice";
import {
  Checkbox,
  Button,
  List,
  ListItem,
  Text,
  Flex,
  Heading,
  Input,
  Box,
} from "@chakra-ui/react";

const TaskManager = () => {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filter, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleToggleCompletion = (id: number) => {
    dispatch(toggleTaskCompletion(id));
  };

  // Handle filter change
  const handleFilterChange = (filter: "all" | "completed" | "pending") => {
    dispatch(setFilter(filter));
  };

  // Filter tasks based on the current filter state
  const filteredTasks = () => {
    if (filter === "completed") return tasks.filter((task) => task.completed);
    if (filter === "pending") return tasks.filter((task) => !task.completed);
    return tasks; // 'all' filter
  };

  return (
    <Box maxW="md" mx="auto" p={4} bg="white" borderRadius="md" boxShadow="md">
      <Heading as="h1" size="xl" fontWeight="bold" mb={4}>
        Task Manager
      </Heading>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <Flex justify="space-between" mb={4}>
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          w="full"
          p={2}
          fontSize="sm"
          color="gray.700"
          borderRadius="lg"
          focusBorderColor="gray.600"
        />
        <Button
          onClick={handleAddTask}
          ml={2}
          bg="green.500"
          _hover={{ bg: "green.700" }}
          color="white"
          fontWeight="bold"
          py={2}
          px={4}
          borderRadius="md"
        >
          Add
        </Button>
      </Flex>

      {/* Filter Buttons */}
      <Flex justify="space-between" mb={4}>
        <Button
          onClick={() => handleFilterChange("all")}
          bg={filter === "all" ? "blue.500" : "gray.300"}
          _hover={{ bg: filter === "all" ? "blue.700" : "gray.400" }}
          color="white"
          fontWeight="bold"
          py={2}
          px={4}
          borderRadius="md"
        >
          All
        </Button>
        <Button
          onClick={() => handleFilterChange("completed")}
          bg={filter === "completed" ? "blue.500" : "gray.300"}
          _hover={{ bg: filter === "completed" ? "blue.700" : "gray.400" }}
          color="white"
          fontWeight="bold"
          py={2}
          px={4}
          borderRadius="md"
        >
          Completed
        </Button>
        <Button
          onClick={() => handleFilterChange("pending")}
          bg={filter === "pending" ? "blue.500" : "gray.300"}
          _hover={{ bg: filter === "pending" ? "blue.700" : "gray.400" }}
          color="white"
          fontWeight="bold"
          py={2}
          px={4}
          borderRadius="md"
        >
          Pending
        </Button>
      </Flex>

      <List spacing={2}>
        {filteredTasks().map((task) => (
          <ListItem key={task.id} display="flex" alignItems="center" mb={2}>
            <Checkbox
              isChecked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
              mr={2}
              size="md"
            />
            <Text
              fontSize="sm"
              textDecoration={task.completed ? "line-through" : "none"}
              color={task.completed ? "gray.400" : "gray.700"}
            >
              {task.title}
            </Text>
            <Button
              onClick={() => handleDeleteTask(task.id)}
              ml="auto"
              bg="red.500"
              _hover={{ bg: "red.700" }}
              color="white"
              fontWeight="bold"
              size="sm"
              borderRadius="md"
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskManager;
