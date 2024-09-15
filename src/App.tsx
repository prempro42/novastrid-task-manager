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
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface Filter {
  all: boolean;
  completed: boolean;
  pending: boolean;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [taskId, setTaskId] = useState(1);
  const [filter, setFilter] = useState<Filter>({
    all: true,
    completed: false,
    pending: false,
  });

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: taskId, text: newTask, completed: false }]);
      setNewTask("");
      setTaskId(taskId + 1);
    }
  };

  const handleCompleteTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleFilter = (type: "all" | "completed" | "pending") => {
    setFilter({
      all: type === "all",
      completed: type === "completed",
      pending: type === "pending",
    });
  };

  const filteredTasks = () => {
    if (filter.all) return tasks;
    if (filter.completed) return tasks.filter((task) => task.completed);
    if (filter.pending) return tasks.filter((task) => !task.completed);
    return tasks;
  };

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
          onClick={() => handleFilter("all")}
          mr={2}
          bg={filter.all ? "blue.500" : "gray.300"}
          _hover={{ bg: filter.all ? "blue.700" : "gray.400" }}
          color="white"
          fontWeight="bold"
          py={2}
          px={4}
          borderRadius="md"
        >
          All
        </Button>
        <Button
          onClick={() => handleFilter("completed")}
          mr={2}
          bg={filter.completed ? "blue.500" : "gray.300"}
          _hover={{ bg: filter.completed ? "blue.700" : "gray.400" }}
          color="white"
          fontWeight="bold"
          py={2}
          px={4}
          borderRadius="md"
        >
          Completed
        </Button>
        <Button
          onClick={() => handleFilter("pending")}
          bg={filter.pending ? "blue.500" : "gray.300"}
          _hover={{ bg: filter.pending ? "blue.700" : "gray.400" }}
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
              onChange={() => handleCompleteTask(task.id)}
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
