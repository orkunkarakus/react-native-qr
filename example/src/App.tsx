import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
// Eslint check ignored because local lib not resolved
// eslint-disable-next-line import/no-unresolved
import { generateQrCode } from 'react-native-qr';

const SIZE = 250;
const TEXT = 'https://orkunkarakus.com';

const App = () => {
	const [result, setResult] = useState<string | undefined>();

	useEffect(() => {
		generateQrCode(TEXT, SIZE).then((img: string | undefined) => {
			if (!img) {
				return;
			}
			setResult(img);
		});
	}, []);

	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: result
				}}
				style={{
					width: SIZE,
					height: SIZE
				}}
				resizeMode="cover"
			/>
			<Text style={styles.contentTitle}>
				Content: <Text style={styles.contentText}>{TEXT}</Text>
			</Text>
		</View>
	);
};

App.displayName = 'App';
export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentTitle: {
		marginTop: 10
	},
	contentText: {
		color: 'rgb(3,105,161)'
	}
});
