import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ExploreScreen() {
  const apiKey = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';
  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        #map { 
          width: 100%; 
          height: 100vh; 
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f5f5f5;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div id="map">
        <div class="loading">Loading map...</div>
      </div>
      <script>
        function initMap() {
          try {
            const map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: 37.78825, lng: -122.4324 },
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true
            });
            
            // Add a marker for the center point
            new google.maps.Marker({
              position: { lat: 37.78825, lng: -122.4324 },
              map: map,
              title: 'San Francisco'
            });
          } catch (error) {
            document.getElementById('map').innerHTML = '<div class="loading">Error loading map</div>';
          }
        }
        
        // Handle errors
        window.addEventListener('error', function() {
          document.getElementById('map').innerHTML = '<div class="loading">Error loading map</div>';
        });
      </script>
      <script async defer src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap"></script>
    </body>
    </html>
  `;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Map
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Interactive Google Maps
        </ThemedText>
      </View>
      <WebView
        style={styles.map}
        source={{ html: mapHTML }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        bounces={false}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onError={(syntheticEvent) => {
          console.log('WebView error:', syntheticEvent.nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          console.log('WebView HTTP error:', syntheticEvent.nativeEvent);
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  map: {
    flex: 1,
  },
});
