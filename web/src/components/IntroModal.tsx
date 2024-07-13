import React from 'react';
import { Modal, Button, Text } from '@mantine/core';

interface IntroModalProps {
  opened: boolean;
  onClose: () => void;
}

const IntroModal: React.FC<IntroModalProps> = ({ opened, onClose }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={
        <Text size="lg" fw={700}>Welcome to Agent SAK</Text>
      }
    >
      <Text>
        Agent SAK is a multi-agent security monitoring system that pulls feeds from various data sources, including on-premises 3D data, door access logs, server logs, filesystem permissions, and other security sources both cyber and physical.
      </Text>
      <br></br>
      <Text>
        The system bridges the gap between social engineering attacks and physical security breaches, such as keycards being stolen, malware being uploaded, and backdoors being served from enterprise servers.
      </Text>
      <br></br>
      <Text>
        Agent SAK integrates these diverse data streams to provide a comprehensive view of your security landscape, helping you to detect and respond to threats more effectively.
      </Text>
      <br></br>
      <Text>
        Use the system to monitor and analyze security events in real-time, ensuring that you can quickly identify and mitigate potential risks.
      </Text>
      <br></br>
      <Text>
        Click the Learn More button to understand how our advanced analytics and machine learning algorithms work behind the scenes to provide actionable insights and enhance your security posture.
      </Text>
      <br></br>
      <Text>
        If accessing the system on a small screen, make sure to use the top-left burger menu to navigate through different data sources and security events.
      </Text>
      <br></br>
      <Text size="xs">
        For advanced users, the system's configuration and customization options allow you to tailor the monitoring and alerting mechanisms to your specific needs. Click Learn More for detailed documentation and best practices.
      </Text>
      <br></br>
      <Button onClick={onClose}>
        Got it, let's secure!
      </Button>
    </Modal>
  );
};

export default IntroModal;