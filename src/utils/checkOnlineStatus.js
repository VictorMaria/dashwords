export const checkOnlineStatus = async () => {
    try {
      const online = await fetch('https://google.com', {
              mode: 'no-cors',
              });
      return online.status >= 200 && online.status < 300;
    } catch (err) {
      return false;
    }
  };