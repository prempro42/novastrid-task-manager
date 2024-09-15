import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../features/tasksSlice";
import { Button, Flex } from "@chakra-ui/react";
import { RootState, AppDispatch } from "../../store";

const TaskFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector((state: RootState) => state.tasks);

  const handleFilterChange = (filter: "all" | "completed" | "pending") => {
    dispatch(setFilter(filter));
  };

  return (
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
  );
};

export default TaskFilters;
