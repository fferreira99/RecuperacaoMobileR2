import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native'; 
import axios from 'axios';

const App = () => {
  const [drinkName, setDrinkName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState('');

  const searchDrinkByName = async () => {
    try {
      const response = await axios.get(`http://10.136.63.230:3000/drinks?name=${drinkName}`); 
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        const drinkData = response.data[0];
        setIngredients(drinkData.ingredients);
        setError('');
      } else {
        setIngredients([]);
        setError('Drink não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar drink:', error);
      setIngredients([]);
      setError('Erro ao buscar drink.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite o nome do drink que deseja:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do drink. Ex: Margarita"
        value={drinkName}
        onChangeText={text => setDrinkName(text)}
        keyboardType="default"
      />
      <Button
        title="Buscar"
        onPress={searchDrinkByName}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Exibir os ingredientes do drink */}
      <ScrollView style={styles.ingredientsContainer}>
        {ingredients.map((ingredient, index) => (
          <TextInput
            key={index}
            style={styles.ingredientItem}
            value={ingredient}
            editable={false}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  ingredientsContainer: {
    width: '80%',
    marginTop: 10,
    maxHeight: 200,
  },
  ingredientItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
