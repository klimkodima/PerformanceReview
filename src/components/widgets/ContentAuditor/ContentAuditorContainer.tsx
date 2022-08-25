import { ReactElement, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  fetchContentAuditor,
  selectContentAuditor
} from 'src/store/ContentAuditor';
import { selectCheckedAuditorsData } from 'src/store/Filter';
import ContentAuditorWidget from './ContentAuditorWidget';

const ContentAuditorContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const checkedAuditors = useSelector(selectCheckedAuditorsData);

  useEffect(() => {
    dispatch(fetchContentAuditor());
  }, [checkedAuditors]);

  const auditorData = useSelector(selectContentAuditor);

  return <ContentAuditorWidget auditorData={auditorData} />;
};

export default ContentAuditorContainer;
