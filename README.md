# phone-modal

A React component that displays a modal for collecting and validating phone numbers, with success state handling and local storage persistence.

## Features

- 📱 Phone number input with validation
- 💾 Local storage persistence
- ✅ Success state handling
- 🎨 Clean and modern UI
- 🔒 TypeScript support
- 📦 Lightweight and easy to integrate

## Installation

```bash
npm install phone-modal
# or
yarn add phone-modal
```

## Usage

```tsx
import { setPhone } from 'phone-modal';

// Basic usage in an async function
async function handlePhoneInput() {
  const phone = await setPhone();
  console.log('User phone:', phone);
}

// Example with error handling in an async function
async function handlePhoneInputWithError() {
  try {
    const phone = await setPhone();
    if (phone) {
      console.log('Phone number saved:', phone);
    } else {
      console.log('No phone number provided');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// React component example
function PhoneInputComponent() {
  const handleClick = async () => {
    const phone = await setPhone();
    // Handle the phone number
  };

  return (
    <button onClick={handleClick}>
      Enter Phone Number
    </button>
  );
}
```

## API

### `setPhone(): Promise<string>`

Returns a promise that resolves with the user's phone number.

- If the user provides a valid phone number, the promise resolves with that number
- If there's an existing phone number in localStorage, it will be pre-filled

## Phone Number Validation

The component validates phone numbers using the following rules:
- Must contain at least 10 digits
- Non-digit characters are automatically removed
- Spaces and special characters are allowed in input but removed during validation

## Styling

The modal comes with a basic design out of the box. The styles are defined in the `modalStyles.ts` file and include:

- Responsive backdrop
- Centered modal with shadow
- Input field with validation feedback
- Success screen with saved phone number
- Consistent button styling

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/TerraCotta777/phone-modal.git
cd phone-modal
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Available Scripts

- `npm run build` - Build the package
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

### Project Structure

```
phone-modal/
├── src/
│   ├── __tests__/
│   │   ├── PhoneInput.test.tsx
│   │   ├── PhoneModal.test.tsx
│   │   ├── SuccessScreen.test.tsx
│   │   └── index.test.ts
│   ├── components/
│   │   ├── PhoneInput.tsx
│   │   ├── PhoneModal.tsx
│   │   └── SuccessScreen.tsx
│   ├── styles/
│   │   └── modalStyles.ts
│   ├── types/
│   ├── index.ts
│   └── setupTests.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── jest.config.js
├── rollup.config.mjs
└── README.md
```

## Testing

The package includes comprehensive tests for all components and functionality:

- Unit tests for the modal manager
- Component tests for PhoneInput, PhoneModal, and SuccessScreen
- Integration tests for the complete flow

Run tests with:
```bash
npm test
```

## Building

The package is built using Rollup and TypeScript. The build process:
- Generates CommonJS and ES modules
- Creates TypeScript declaration files
- Minifies the output
- Handles peer dependencies

Build the package with:
```bash
npm run build
```

## Author

- [terracotta00](https://github.com/TerraCotta777)

## Repository

[GitHub Repository](https://github.com/TerraCotta777/phone-modal)

