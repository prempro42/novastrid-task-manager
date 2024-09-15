import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import {
  addTask,
  toggleTaskCompletion,
  deleteTask,
  setFilter,
} from "./features/tasksSlice";

const TaskManager = () => {
  const [newTask, setNewTask] = useState("");
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return false;
  });

  return (
    <Box maxW="md" mx="auto" p={4} bg="white" borderRadius="md" boxShadow="md">
      <Heading as="h1" size="xl" fontWeight="bold" mb={4}>
        Task Manager
      </Heading>
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

      <Flex justify="space-between" mb={4}>
        <Button
          onClick={() => dispatch(setFilter("all"))}
          mr={2}
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
          onClick={() => dispatch(setFilter("completed"))}
          mr={2}
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
          onClick={() => dispatch(setFilter("pending"))}
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
        {filteredTasks.map((task) => (
          <ListItem key={task.id} display="flex" alignItems="center" mb={2}>
            <Checkbox
              isChecked={task.completed}
              onChange={() => dispatch(toggleTaskCompletion(task.id))}
              mr={2}
              size="md"
            />
            <Text
              fontSize="sm"
              textDecoration={task.completed ? "line-through" : "none"}
              color={task.completed ? "gray.400" : "gray.700"}
            >
              {task.text}
            </Text>
            <Button
              onClick={() => dispatch(deleteTask(task.id))}
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
