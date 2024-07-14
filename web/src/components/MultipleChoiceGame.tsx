import React, { useState } from 'react';
import { Button, Radio, Stack, Title } from '@mantine/core';

interface MultipleChoiceGameProps {
  onBackToGame: (answers: string[]) => void;
  onResumeGame: () => void;
}

const questions = [
  {
    question: "Who compromised security and uploaded malware to the enterprise servers?? (Question 1/3)",
    choices: ["Sec Chief Sarah", 
              "CEO Mark", 
              "IT Manager Tom", 
              "New Hire Nina",
              "HR Rachel",
            ]
  },
  {
    question: "What was the motive for compromising security and uploading malware to the enterprise servers? (Question 2/3)",
    choices: ["Corporate Espionage", 
              "Financial Gain",
              "Political Agenda", 
              "Personal Vendetta",
              "Extortion",
            ]
  },
  {
    question: "What was their method for compromising affected systems? (Final Question)",
    choices: ["Phishing Attack", 
            "Social Engineering", 
            "Malware Injection", 
            "Ransomware",
            "Unpatched Vulnerabilities",
            ],
  }
];

const MultipleChoiceGame: React.FC<MultipleChoiceGameProps> = ({ onBackToGame, onResumeGame }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleNextQuestion = () => {
    if (selectedChoice !== null) {
      const newAnswers = [...answers, selectedChoice];
      setAnswers(newAnswers);
      setSelectedChoice(null); // Reset selected choice for next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onBackToGame(newAnswers); // Pass answers back when game is finished
      }
    }
  };

  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(event.currentTarget.value);
  };

  return (
    <div>
      <Title order={2}>{questions[currentQuestionIndex].question}</Title>
      <br></br>
      <Stack>
        {questions[currentQuestionIndex].choices.map((choice, index) => (
          <Radio
            key={index}
            value={choice}
            checked={selectedChoice === choice}
            onChange={handleChoiceChange}
            label={choice}
          />
        ))}
      </Stack>
      <br></br>
      <Button onClick={handleNextQuestion} disabled={!selectedChoice}>
        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish"}
      </Button>
      <br></br>
      <Button
        onClick={onResumeGame}
        size="xs"
        variant="outline"
        style={{ marginTop: '20px', alignSelf: 'center' }}
      >
        Back
      </Button>
    </div>
  );
};

export default MultipleChoiceGame;