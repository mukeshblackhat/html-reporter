import React from 'react';
import { useGlobalContext } from '../../hooks/GlobalContext';
import { useReportContext } from '../../hooks/ReportContext';
import { convertMsToTime } from '../../utils';
import EnvironmentMetadata from '../EnvironmentMetadata';
import FilePathView from '../FilePathView';
import Separator from '../Separator';
import TestBlockName from '../TestBlockName';
import { Text } from '../Text';
import { EnvironmentAndSpecName, Metadata, TestBlockDetails, Wrapper } from './style';
import { getMetadata } from './utils';
import TestMetadataVrt from '../TestMetadataVrt';
import { isVRT, isHtml } from '../../constants';

const returnEnvironmentMetadata = (meta: any) => {
  // FIXME: remove type casting as any
  return (
    <EnvironmentMetadata
      meta={{
        device: meta?.device as any,
        browserName: meta?.browserName as any,
        browserVersion: meta?.browserVersion as any,
        operatingSystemName: meta?.platformName as any,
        tags: [meta?.executionMode as any],
        time: convertMsToTime(meta?.time).time
      }}
    />
  );
};

const returnTestBlockDetails = (meta: any) => {
  return (
    <TestBlockDetails>
      <FilePathView>{`${meta?.filepath}`}</FilePathView>
      {/* <TagGroup>
      <Tags>Tag Name</Tags>
    </TagGroup> */}
    </TestBlockDetails>
  );
};

const returnTestMetadataVrt = (meta: any) => {
  return (
    <TestMetadataVrt
      meta={{
        browserName: meta?.envName as any,
        diff: meta?.diff as any
      }}
    />
  );
};
const SpecMetaData: React.FC = () => {
  const { environmentName, fileId, testId } = useReportContext();
  const { environments } = useGlobalContext();

  // FIXME: Replace any with types
  const {
    testName,
    status,
    meta: {
      envName,
      filename,
      device,
      browserName,
      browserVersion,
      platformName,
      executionMode,
      time,
      filepath
    } = {
      envName: undefined,
      filename: undefined,
      device: undefined,
      browserName: undefined,
      browserVersion: undefined,
      platformName: undefined,
      executionMode: undefined,
      time: undefined,
      filepath: undefined
    }
  } = getMetadata(environments[environmentName], fileId, testId) as any;

  return (
    <Wrapper>
      <Metadata>
        <EnvironmentAndSpecName>
          {envName && filename && (
            <>
              <Text fontSize={12} lineHight={20} color="grey-100">
                {envName}
              </Text>
              <Separator height={12} borderColor="--color-grey-100" />
              <Text fontSize={12} lineHight={20} color="grey-100">
                {`Spec: ${filename}`}
              </Text>
            </>
          )}
        </EnvironmentAndSpecName>
        {/* FIXME: remove type casting as any */}
        <EnvironmentMetadata
          meta={{
            device: device as any,
            browserName: browserName as any,
            browserVersion: browserVersion as any,
            operatingSystemName: platformName as any,
            tags: [executionMode as any],
            time: convertMsToTime(time).time
          }}
        />
      </Metadata>
      <TestBlockName status={status}>{testName}</TestBlockName>

      <TestBlockDetails>
        {filepath && <FilePathView>{`${filepath}`}</FilePathView>}
        {/* <TagGroup>
          <Tags>Tag Name</Tags>
        </TagGroup> */}
      </TestBlockDetails>
    </Wrapper>
  );
};

export default SpecMetaData;
