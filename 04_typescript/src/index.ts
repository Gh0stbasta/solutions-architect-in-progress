type Joke = {
  setup: string;
  punchline: string;
};

async function getJoke(): Promise<string> {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = (await response.json()) as Joke;
    console.log(data);
    return `${data.setup} - ${data.punchline}`;
  } catch (error) {
    throw new Error("Fehler beim Laden des Witzes");
  }
}

getJoke().then((joke) => console.log(joke));
