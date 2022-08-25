import {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useState
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent } from '@mui/material/Select';

import { Modal } from 'src/components/common';
import { selectTeamsData } from 'src/store/Filter';
import { LEVEL, ROLE_NAME } from 'src/constants';
import {
  AddNewUserFormValuesType,
  createNewUser,
  selectAddNewUserError,
  selectIsCloseAddNewUserModal,
  selectUsers,
  setIsCloseAddNewUserModal,
  setNewUserError
} from 'src/store/Users';
import AddNewUserModal from './AddNewUserModal';
import { createTeams } from './helpers';

import { AddNewUserValidationType } from './types';

type AddNewUserModalContainerPropsType = {
  onCloseModalClick: () => void;
};

const initAddNewUserFormValues = {
  fullName: '',
  password: '',
  email: '',
  roleName: '',
  username: '',
  thirdParty: false,
  level: '',
  teamName: ''
};

const initialValidation = {
  email: null,
  roleName: null,
  password: null,
  username: null,
  level: null,
  teamName: null
};

const THIRD_PARTY_KEY = 'thirdParty';

const AddNewUserModalContainer: FC<AddNewUserModalContainerPropsType> = ({
  onCloseModalClick
}): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const teamsData = useSelector(selectTeamsData);
  const usersData = useSelector(selectUsers);
  const responseError = useSelector(selectAddNewUserError);
  const IsCloseAddNewUserModal = useSelector(selectIsCloseAddNewUserModal);

  const [formValues, setFormValues] = useState<AddNewUserFormValuesType>(
    initAddNewUserFormValues
  );
  const [copyFormValues, setCopyFormValues] =
    useState<AddNewUserFormValuesType>(initAddNewUserFormValues);
  const [validation, setValidation] =
    useState<AddNewUserValidationType>(initialValidation);
  const [isDisableSaveButton, setIsDisableSaveButton] = useState<boolean>(true);
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] =
    useState<boolean>(false);

  const teams = useMemo(
    () => createTeams(usersData, teamsData),
    [usersData, teamsData]
  );

  const currentTeam = teams.find(
    (team) => team.teamName === formValues.teamName
  );

  const isShowLevelAndTeamInputs =
    formValues.roleName === ROLE_NAME.TEAM_LEADER ||
    formValues.roleName === ROLE_NAME.AUDITOR;

  const isShowTeamError = Boolean(
    currentTeam?.teamLeaderName && formValues.roleName === ROLE_NAME.TEAM_LEADER
  );

  const handleCloseModalClick = () => {
    onCloseModalClick();
    setFormValues(initAddNewUserFormValues);
    dispatch(setNewUserError(null));
  };

  const handleSelectChange = (label: string) => (e: SelectChangeEvent) => {
    setFormValues({ ...formValues, [label]: e.target.value });
  };

  const handleInputChange =
    (label: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      label === THIRD_PARTY_KEY
        ? setFormValues({ ...formValues, [label]: !formValues.thirdParty })
        : setFormValues({ ...formValues, [label]: e.target.value });
    };

  const validateForm = (): AddNewUserValidationType | undefined => {
    let newValidationValues: AddNewUserValidationType = {
      email: null,
      roleName: null,
      password: null,
      username: null,
      level: null,
      teamName: null
    };

    if (!formValues.username) {
      newValidationValues = {
        ...newValidationValues,
        username: t('add_new_user_modal.username_empty_error')
      };
    } else if (
      formValues.username.length < 5 ||
      formValues.username.length > 50
    ) {
      newValidationValues = {
        ...newValidationValues,
        username: t('add_new_user_modal.username_length_error')
      };
    }

    if (!formValues.password) {
      newValidationValues = {
        ...newValidationValues,
        password: t('add_new_user_modal.password_empty_error')
      };
    } else if (
      formValues.password.length < 8 ||
      formValues.password.length > 40
    ) {
      newValidationValues = {
        ...newValidationValues,
        password: t('add_new_user_modal.password_length_error')
      };
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
      newValidationValues = {
        ...newValidationValues,
        email: t('add_new_user_modal.email_error')
      };
    }

    if (!formValues.roleName) {
      newValidationValues = {
        ...newValidationValues,
        roleName: t('add_new_user_modal.roleName_empty_error')
      };
    }

    if (!formValues.teamName && isShowLevelAndTeamInputs) {
      newValidationValues = {
        ...newValidationValues,
        teamName: t('add_new_user_modal.teamName_empty_error')
      };
    }

    if (!formValues.level && isShowLevelAndTeamInputs) {
      newValidationValues = {
        ...newValidationValues,
        level: t('add_new_user_modal.level_empty_error')
      };
    }

    setValidation(newValidationValues);

    setIsSubmitButtonClicked(true);
    return newValidationValues;
  };

  const handleFormSubmit = () => {
    setCopyFormValues(formValues);
    const newValidationValues = validateForm();
    if (
      newValidationValues?.username !== null ||
      newValidationValues.email !== null ||
      newValidationValues.password !== null ||
      newValidationValues.roleName !== null ||
      newValidationValues.level !== null ||
      newValidationValues.teamName !== null ||
      responseError
    ) {
      setIsDisableSaveButton(true);
    } else {
      setIsDisableSaveButton(false);
      if (isShowLevelAndTeamInputs) {
        dispatch(
          createNewUser({
            ...formValues,
            fullName: formValues.username,
            teamId: currentTeam?.teamId ? currentTeam.teamId : null
          })
        );
      } else {
        dispatch(
          createNewUser({ ...formValues, fullName: formValues.username })
        );
      }
    }
  };

  useEffect(() => {
    dispatch(setNewUserError(null));
  }, []);

  useEffect(() => {
    if (IsCloseAddNewUserModal) {
      handleCloseModalClick();
      dispatch(setIsCloseAddNewUserModal(false));
    }
  }, [IsCloseAddNewUserModal]);

  useEffect(() => {
    if (isSubmitButtonClicked) validateForm();

    if (responseError) setIsDisableSaveButton(true);

    if (responseError === t('add_new_user_modal.username_response_error')) {
      setValidation({
        ...validation,
        username: t('add_new_user_modal.username_response_error')
      });
    }
    if (responseError === t('add_new_user_modal.email_response_error')) {
      setValidation({
        ...validation,
        email: t('add_new_user_modal.email_response_error')
      });
    }
  }, [responseError]);

  useEffect(() => {
    if (
      formValues.roleName !== ROLE_NAME.TEAM_LEADER &&
      formValues.roleName !== ROLE_NAME.AUDITOR
    ) {
      setFormValues({ ...formValues, teamName: '', level: '' });
    }
    if (formValues.roleName === ROLE_NAME.TEAM_LEADER) {
      setFormValues({ ...formValues, level: LEVEL.TEAM_LEAD });
    }
  }, [formValues.roleName]);

  useEffect(() => {
    let isDisabled: boolean;

    if (
      (!formValues.username ||
        !formValues.email ||
        !formValues.roleName ||
        !formValues.password) &&
      !isShowLevelAndTeamInputs
    ) {
      isDisabled = true;
    } else if (
      isShowLevelAndTeamInputs &&
      (!formValues.username ||
        !formValues.email ||
        !formValues.roleName ||
        !formValues.password ||
        !formValues.teamName ||
        !formValues.level)
    ) {
      isDisabled = true;
    } else isDisabled = isShowTeamError;

    if (isSubmitButtonClicked) {
      if (formValues.email !== copyFormValues.email) {
        setValidation((prevValidation) => ({ ...prevValidation, email: null }));
        dispatch(setNewUserError(null));
      }
      if (formValues.username !== copyFormValues.username) {
        setValidation((prevValidation) => ({
          ...prevValidation,
          username: null
        }));
        dispatch(setNewUserError(null));
      }
      if (formValues.password !== copyFormValues.password) {
        setValidation((prevValidation) => ({
          ...prevValidation,
          password: null
        }));
      }
    }
    setIsDisableSaveButton(isDisabled);
  }, [formValues]);

  return (
    <Modal
      isShowFooterButtons={true}
      onCloseClick={handleCloseModalClick}
      onSaveClick={handleFormSubmit}
      isDisabledSaveButton={isDisableSaveButton}
      closeButtonText={t('add_new_user_modal.cancel_button')}
      saveButtonText={t('add_new_user_modal.save_button')}
    >
      <AddNewUserModal
        onSelectChange={handleSelectChange}
        onInputChange={handleInputChange}
        formValues={formValues}
        teams={teams}
        isShowTeamError={isShowTeamError}
        isShowLevelAndTeamInputs={isShowLevelAndTeamInputs}
        validation={validation}
      />
    </Modal>
  );
};

export default AddNewUserModalContainer;
