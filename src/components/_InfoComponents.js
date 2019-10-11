import React from 'react';
import styled from 'styled-components';

export const GeneralRadarExplanation = () => {
  return (
    <StyledGeneralExplanation>
      <h3>General information</h3>
      <p style={{ textAlign: 'justify' }}>
        The Tech Radar is used by the company to discover technology in each department. It maps out
        which technology is hot, and which is not. The inner rings contains technology which should
        be adapted, while the outer rings represents technology one should stay away from. This is a
        radar which is created and maintained by the departments, communities and the company
        itself. It should be updated to reflect the current status of the industry you work in. If
        it's maintained, then the credibility of the radar itself is held up and other can trust
        that the adapt technology is truly adaptable, and the 'hold' technology is truly outdated.
      </p>
    </StyledGeneralExplanation>
  );
};
export const RadarExplanationInformation = () => {
  return (
    <StyledRadarInformationWrapper>
      <h3>
        <span role="img" aria-label={'robot'}>
          ❓
        </span>
        Quadrants
      </h3>
      <div>
        <p>
          <b>Programming Languages and Frameworks.</b> Everything considered a programming language
          (e.g. JavaScript, TypeScript, Node) or a framework (e.g. React, Vue, Angular).
        </p>
        <p>
          <b>Tools.</b> These can be components, such as databases, software development tools, such
          as versions control systems; or more generic categories of tools, such as the notion of
          polyglot persistence.
        </p>
        <p>
          <b>Platforms.</b> Things that we build software on top of such as mobile technologies like
          Android, virtual platforms like the JVM engine, V8 browser engine, or generic kinds of
          platforms like hybrid clouds (e.g. AWS, Azure)
        </p>
        <p>
          <b>Techniques.</b> These include elements of a software development process, such as
          experience design; and ways of structuring software, such as microservices, or programming
          patterns, code structure, folder hierarchy.
        </p>
      </div>
      <h3>
        <span role="img" aria-label={'robot'}>
          ❓
        </span>
        Rings
      </h3>
      <div>
        <p>
          <b>Adopt</b> represents bubbles that we think you should be using now. We don't say that
          you should use these for every project; any tool should only be used in an appropriate
          context. However we do think that a bubble in Adopt represents something where there's no
          doubt that it's proven and mature for use.
        </p>
        <p>
          <b>Trial</b> is for bubbles that we think are ready for use, but not as completely proven
          as those in the Adopt ring. So for most organizations we think you should use these on a
          trial basis, to decide whether they should be part of your toolkit.
        </p>
        <p>
          <b>Assess</b> are tech that you should look at closely, but not necessarily trial yet -
          unless you think they would be a particularly good fit for you. Typically, bubbles in the
          Assess ring are tech that we're currently trialling, on our projects.
        </p>
        <p>
          <b>Hold</b> is for things that, even though they are accepted in the industry, we haven't
          had good experience with. Therefore we are calling them out to warn you that you may run
          into trouble with them as well. Sometimes this is because we don't think they're mature
          enough yet; sometimes it means we think they're irredeemably flawed; or just being
          misused. We do place things in the Hold ring that we wish the industry wouldn't use.
        </p>
      </div>
    </StyledRadarInformationWrapper>
  );
};

export function IntroductionInformation() {
  return (
    <WelcomeScreen>
      <h3>
        <span role="img" aria-label={'robot'}>
          ⭐
        </span>
        About
      </h3>

      <p>
        The Tech Radar application is built to easily collaborate in creating technology radars.
        This was built by employees at Capgemini and is used by the communities to build custom
        radars.
      </p>
      <h3>
        <span role="img" aria-label={'robot'}>
          🤖
        </span>
        Manage Radars
      </h3>
      <ul>
        <li>The 'manage radars' button in the header is used to create new and empty radars</li>
        <li>You can also filter all the created radars by clicking the button</li>
      </ul>
      <h3>
        <span role="img" aria-label={'note'}>
          📝
        </span>
        Adding technology
      </h3>
      <ul>
        <li>
          At the bottom of the application, there is a form to add technology. Above that, an
          explanation to key words can be found.
        </li>
        <li>
          The dropdown list of radars are the ones you've currently filtered in 'manage radars'
        </li>
        <li>
          Submitting a new technology requires an admin to approve it. The reason for this is not to
          limit, but for workshop purposes. When technology is added, it will be added to an
          'unconfirmed' list and display on the admin screen. This is displayed at a large screen to
          provoke discussion about the technology.
        </li>
        <li>The admin approval might be removed later.</li>
      </ul>

      <h3>
        <span role="img" aria-label={'computer'}>
          👩‍💻
        </span>
        Want to join?
      </h3>
      <p>
        This is an open source application created with <b>React 16.8 (Hooks, Context)</b>. The API
        is build with <b>GraphQL</b> through <b>AWS AppSync</b>. By using the{' '}
        <b>AWS Amplify library</b> the API is autogenerated based on a model. The infrastructure in
        AWS also uses <b>Cognito</b> and <b>IAM</b> to manage users. It uses <b>Heroku</b> to host
        the platform.
        <br />
        This is a fun frontend project used to test out cutting edge JS technology. Get access to
        the developing the application by talking to Jørgen Lybeck Hansen.
      </p>
    </WelcomeScreen>
  );
}

const StyledGeneralExplanation = styled.div``;
const StyledRadarInformationWrapper = styled.div`
  p {
    margin-bottom: 30px;
  }
`;

const WelcomeScreen = styled.div``;
