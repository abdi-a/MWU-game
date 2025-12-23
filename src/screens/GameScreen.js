import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

// Sample Data - You will replace these with real photos of MWU buildings
const QUESTIONS = [
  {
    id: 1,
    question: "Which building is this?",
    // image: require('../../assets/library.jpg'), // You will add images later
    options: ["Main Library", "Administration", "Science Block", "Student Dorm"],
    correctAnswer: "Main Library",
    description: "The Main Library is the heart of academic research at MWU."
  },
  {
    id: 2,
    question: "Where is the President's Office located?",
    options: ["Block A", "Block B", "Administration Building", "New Complex"],
    correctAnswer: "Administration Building",
    description: "The President's office is located on the top floor of the Admin building."
  },
  {
    id: 3,
    question: "This famous spot is known as...",
    options: ["Student Lounge", "Green Park", "Graduation Hall", "Main Gate"],
    correctAnswer: "Main Gate",
    description: "The iconic Main Gate welcomes all students and visitors."
  }
];

const GameScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      Alert.alert("Correct!", currentQuestion.description, [
        { text: "Next", onPress: nextQuestion }
      ]);
    } else {
      Alert.alert("Wrong!", "That was not the correct answer.", [
        { text: "Next", onPress: nextQuestion }
      ]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game Over
      navigation.replace('Result', { score: score + (currentQuestion.correctAnswer ? 1 : 0), total: QUESTIONS.length });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} / {QUESTIONS.length}
        </Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>[Building Image Here]</Text>
        </View>
        
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d40',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d40',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageText: {
    color: '#666',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#004d40',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GameScreen;
