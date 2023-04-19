// import Input from "postcss/lib/input";
import { RegistrationForm } from '@forkly/components/RegistrationForm';
import UserAccountSetup from '@forkly/components/UserAccountSetup';
import classNames from 'classnames';
import { useState } from 'react'

export default function Signup() {
  const [currentStage, setCurrentStage] = useState<STAGE>(STAGE.USER_ACCOUNT_SETUP);

  const handleStageChange = (stage: STAGE) => {
    setCurrentStage(stage);
  };

  return (
    <div className="flex items-center justify-center">
      {currentStage === STAGE.USER_ACCOUNT_SETUP && (
        <UserAccountSetup onNext={() => handleStageChange(STAGE.REGISTRATION)} />
      )}

      {currentStage === STAGE.REGISTRATION && (
        <RegistrationForm
          onBack={() => handleStageChange(STAGE.USER_ACCOUNT_SETUP)}
          onNext={() => handleStageChange(STAGE.ALL_DONE)}
        />
      )}

      {currentStage === STAGE.ALL_DONE && <p>Thank you for signing up!</p>}
    </div>
  );
}

enum STAGE {
  USER_ACCOUNT_SETUP = 1,
  REGISTRATION = 2,
  ALL_DONE = 3
}