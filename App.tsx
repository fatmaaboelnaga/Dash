import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// } 

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });





import BeforeLogin from "./src/pages/before login";
import AfterLogin from "./src/pages/afterLogin";
import Home from "./src/pages/Home";
import Search from "./src/pages/search";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"Home" | "Search">("Home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openSearch = (category: string | null = null) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage("Search");
  };

const handleHomeSearch = (text: string) => {
  setSelectedCategory(null);
  setSearchQuery(text);

  if (text.trim().length > 0) {
    setCurrentPage("Search");
  }
};

  return (
    <View style={styles.container}>
      {currentPage === "Home" ? (
        <Home
          onSelectCategory={openSearch}
          onSearch={handleHomeSearch}
        />
      ) : (
        <Search
          initialCategory={selectedCategory}
          initialSearchText={searchQuery}
          onBack={() => setCurrentPage("Home")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
