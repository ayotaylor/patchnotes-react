//import { ViewStyle, TextStyle, ImageStyle } from "react-native";

//type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export type Style = Record<string, string | number>;

export interface SharedStyles {
  colors: {
    background: string;
    text: string;
    secondary: string;
    accent: string;
    cardBackground: string;
  };
  layout: {
    container: Style;
    gameDetails: Style;
    row: Style;
    column: Style;
  };
  gameHeader: {
    container: Style;
    cover: Style;
    info: Style;
    title: Style;
    detail: Style;
  };
  gameActions: {
    container: Style;
    button: Style;
    buttonText: Style;
  };
  gameInfo: {
    container: Style;
    heading: Style;
    subheading: Style;
    text: Style;
    list: Style;
    listItem: Style;
  };
  gameStats: {
    container: Style;
    stat: Style;
    statLabel: Style;
    statValue: Style;
  };
  similarGames: {
    container: Style;
    heading: Style;
    grid: Style;
    card: Style;
    cardImage: Style;
    cardTitle: Style;
  };
  ratingAction: {
    container: Style;
    star: Style;
    activeStar: Style;
  };
}

export const sharedStyles: SharedStyles = {
  colors: {
    background: "#14181c",
    text: "#ffffff",
    secondary: "#456",
    accent: "#00e054",
    cardBackground: "#2c3440",
  },
  layout: {
    container: {
      flex: 1,
      backgroundColor: "#14181c",
      padding: 20,
    },
    gameDetails: {
      maxWidth: 1000,
      marginHorizontal: "auto",
      padding: 20,
    },
    row: {
      flexDirection: "row",
    },
    column: {
      flexDirection: "column",
    },
  },

  gameHeader: {
    container: {
      flexDirection: "row",
      marginBottom: 30,
    },
    cover: {
      width: 230,
      height: 345,
      borderRadius: 4,
      marginRight: 30,
    },
    info: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 10,
    },
    detail: {
      fontSize: 14,
      color: "#456",
      marginBottom: 5,
    },
  },

  gameActions: {
    container: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 30,
    },
    button: {
      backgroundColor: "#2c3440",
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginRight: 10,
      borderRadius: 4,
    },
    buttonText: {
      color: "#ffffff",
    },
  },

  gameInfo: {
    container: {
      marginBottom: 30,
    },
    heading: {
      fontSize: 20,
      color: "#00e054",
      marginBottom: 10,
    },
    subheading: {
      fontSize: 18,
      color: "#00e054",
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      color: "#ffffff",
      lineHeight: 1.6,
      marginBottom: 20,
    },
    list: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    listItem: {
      backgroundColor: "#2c3440",
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 10,
      marginBottom: 10,
      borderRadius: 4,
    },
  },

  gameStats: {
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 30,
    },
    stat: {
      alignItems: "center",
    },
    statLabel: {
      fontSize: 14,
      color: "#456",
      marginBottom: 5,
    },
    statValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#ffffff",
    },
  },

  similarGames: {
    container: {
      marginBottom: 30,
    },
    heading: {
      fontSize: 20,
      color: "#00e054",
      marginBottom: 20,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    card: {
      width: "22%",
      marginBottom: 20,
      backgroundColor: "#2c3440",
      borderRadius: 4,
      overflow: "hidden",
    },
    cardImage: {
      width: "100%",
      height: 225,
    },
    cardTitle: {
      padding: 10,
      fontSize: 14,
      color: "#ffffff",
      textAlign: "center",
    },
  },

  ratingAction: {
    container: {
      flexDirection: "row",
    },
    star: {
      fontSize: 24,
      color: "#456",
      marginRight: 5,
    },
    activeStar: {
      color: "#00e054",
    },
  },
};
