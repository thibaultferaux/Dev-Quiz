/**
 *  fetch the questions
 */
const fetchQuestions = async (cat, diff, amount) => {
        const fetchedData = await fetch(`https://quizapi.io/api/v1/questions?apiKey=tEvn1OjDahwoVXssF5GlTtgTTR0Tfn00HTCZoSlT&category=${cat}&difficulty=${diff}&limit=${amount}`);
        return await fetchedData.json();
}

export { fetchQuestions };