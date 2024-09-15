import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Button, List, ListItem, Text } from "@chakra-ui/react";
import { RootState, AppDispatch } from "../../store";
import { deleteTask, toggleTaskCompletion } from "../../features/tasksSlice";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = () => {
    if (filter === "completed") return tasks.filter((task) => task.completed);
    if (filter === "pending") return tasks.filter((task) => !task.completed);
    return tasks; // 'all' filter
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleToggleCompletion = (id: number) => {
    dispatch(toggleTaskCompletion(id));
  };

  return (
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
  );
};

export default TaskList;
