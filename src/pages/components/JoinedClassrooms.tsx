import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link"; // Import Link from Next.js
import useClassroomAPI from "@/pages/api/useClassroomsAPI";

const JoinedClassrooms = () => {
  const classroomsAPI = useClassroomAPI();
  const [classList, setClassList] = useState<string[]>([]); // Define the type as string[]
  const [classDetail, setClassDetails] = useState<any[]>([]); // Define the type as any[]

  useEffect(() => {
    const fetchClassrooms = async () => {
      const classrooms = await classroomsAPI.getJoinedClassrooms();
      setClassList(classrooms);

      const detailsPromises = classrooms.map(async (classroom: any) => {
        console.log("Classroom Picking:", classroom);
        return await classroomsAPI.getClassroomDetails(classroom);
      });

      const details = await Promise.all(detailsPromises);
      setClassDetails(details);
    };

    fetchClassrooms();
  }, []);

  console.log("Classroom List:", classList);
  console.log("Classroom Details:", classDetail);

  return (
    <div>
      <List>
        {classList.map((classroom, key) => (
          <Link
            key={key}
            href={`/classroom/${classroom}`} // Define the destination page's URL
            passHref
          >
            <ListItem button>
              <ListItemText
                primary={`${classroom} - ${classDetail[key]?.classroom?.name}`}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default JoinedClassrooms;
