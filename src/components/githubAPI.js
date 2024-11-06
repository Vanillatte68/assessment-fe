const fetchGithubUsers = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  const response = await fetch(url);
  const userData = await response.json();
  return userData;
};

const fetchMultipleGithubUsers = async (usernames) => {
  const promises = usernames.map((username) => fetchGithubUsers(username));
  const userDataArray = await Promise.all(promises);
  return userDataArray;
};

export { fetchMultipleGithubUsers };
