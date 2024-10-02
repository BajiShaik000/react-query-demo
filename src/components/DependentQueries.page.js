import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function DependentQueriespage({ email }) {
  const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
  };

  const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`);
  };

  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;

  const { data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  return (
    <div>
      {courses?.data.courses.map((course) => (
        <div>{course}</div>
      ))}
    </div>
  );
}
