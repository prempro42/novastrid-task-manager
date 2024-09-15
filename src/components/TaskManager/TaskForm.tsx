import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/tasksSlice";
import { Button, Input, Flex } from "@chakra-ui/react";
import { AppDispatch } from "store";

const TaskForm: React.FC = () => {
  const [newTask, setNewTask] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  return (
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
  );
};

export default TaskForm;
