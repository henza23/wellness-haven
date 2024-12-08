// Handle Santa letter submissions and AI responses
document.addEventListener('DOMContentLoaded', () => {
    const letterForm = document.getElementById('santa-letter-form');
    const santaResponse = document.getElementById('santa-response');
    const aiResponse = document.getElementById('ai-response');

    letterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('child-name').value;
        const age = document.getElementById('age').value;
        const letter = document.getElementById('letter-content').value;

        // Show loading state
        letterForm.querySelector('button').disabled = true;
        letterForm.querySelector('button').textContent = 'Sending to Santa...';

        try {
            // Here you would typically make an API call to your AI service
            // For now, we'll simulate an AI response
            const response = await generateSantaResponse(name, age, letter);
            
            // Display the response
            aiResponse.textContent = response;
            santaResponse.classList.remove('hidden');
            
            // Scroll to response
            santaResponse.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Error:', error);
            aiResponse.textContent = "Ho ho ho! Santa's magic quill seems to be out of ink. Please try again later!";
            santaResponse.classList.remove('hidden');
        }

        // Reset form state
        letterForm.querySelector('button').disabled = false;
        letterForm.querySelector('button').textContent = 'Send to Santa';
    });
});

// Simulate AI response generation
async function generateSantaResponse(name, age, letter) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract key words from letter (in a real app, this would use NLP)
    const keywords = letter.toLowerCase().split(' ');
    let presents = keywords.filter(word => 
        ['toy', 'game', 'bike', 'doll', 'book', 'phone', 'computer'].includes(word)
    );

    // Generate personalized response
    let response = `Dear ${name},

Ho ho ho! Thank you for your wonderful letter! Mrs. Claus and I were delighted to read it here at the North Pole. At ${age} years old, you're growing up to be such a thoughtful child.

`;

    if (presents.length > 0) {
        response += `I've noted your interest in ${presents.join(' and ')}. My elves are working very hard in their workshop, and I'll do my very best to make your Christmas wishes come true.`;
    } else {
        response += `Your letter shows what a kind and special child you are. The elves and I are working hard to prepare something special for you.`;
    }

    response += `

Remember to:
• Be good to others
• Listen to your parents
• Keep spreading holiday cheer

I'm watching to see if you're being naughty or nice!

With Christmas Magic,
Santa Claus 🎅
P.S. Don't forget to leave some cookies and carrots for the reindeer!`;

    return response;
}

// Add festive cursor trail effect
document.addEventListener('mousemove', (e) => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = e.pageX + 'px';
    snowflake.style.top = e.pageY + 'px';
    document.body.appendChild(snowflake);

    // Remove snowflake after animation
    setTimeout(() => {
        snowflake.remove();
    }, 1500);
});
