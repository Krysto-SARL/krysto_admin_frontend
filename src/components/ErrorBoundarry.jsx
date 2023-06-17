import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez également enregistrer l'erreur dans un service de journalisation ici
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Personnalisez le rendu de l'interface utilisateur de secours pour les erreurs
      return <h1>Une erreur est survenue.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;