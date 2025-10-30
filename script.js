const userInfo = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUserData() {
  userInfo.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`Http error! Status: ${response.status}`);
    }

    const users = await response.json();
    userInfo.innerHTML = "";

    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>`;
      userInfo.appendChild(card);
    });
  } catch (error) {
    userInfo.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

reloadBtn.addEventListener('click', fetchUserData);

// Initial fetch on page load
fetchUserData();