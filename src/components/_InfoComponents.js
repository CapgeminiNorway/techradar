import React from "react";
import styled from "styled-components";

export const GeneralRadarExplanation = () => {
  return (
    <StyledGeneralExplanation>
      <h3>General information</h3>
      <p>
        The Tech Radar is used by the company to discover technology in each department. It maps out
        which technology is hot, and which is not. The inner rings contains technology which should
        be adapted, while the outer rings represents technology one should stay away from. The radar
        your team creates is maintained by the departments, communities and the company.
        <br />
        <br />
        It should be updated to reflect the current status of the technology you work with. If it's
        maintained, then the credibility of the radar is held up and others can trust that the adapt
        technology is truly adaptable, and the 'hold' technology is truly outdated.
      </p>
    </StyledGeneralExplanation>
  );
};
export const RadarExplanationInformation = () => {
  return (
    <StyledRadarInformationWrapper>
      <h3>
        <span role="img" aria-label={"robot"}>
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
        <span role="img" aria-label={"robot"}>
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
        <span role="img" aria-label={"robot"}>
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
        <span role="img" aria-label={"note"}>
          📝
        </span>
        Adding technology
      </h3>
      <ul>
        <li>Click "Add Tech".</li>
        <li>Fill inn all data and make sure you understand what the different categories mean.</li>
        <li>
          Select the radar you want to add the Tech to. Only selected radars appear in the dropdown.
          On desktop, you can select a radar while adding new tech.
        </li>
        <li>Submitting a new technology requires an admin to approve it.</li>
        <li>
          The technology is displayed in the "Unconfirmed Tech" list. If an admin adds Tech, or
          approves Unconfirmed Tech, it is added to both the radar and the "Confirmed Tech" list.
        </li>
      </ul>
      <h3>
        <span role="img" aria-label={"note"}>
          📝
        </span>
        Update Tech
      </h3>
      <ul>
        <li>
          Click on Tech from the list of Confirmed/Unconfirmed Tech, or directly from the Radar
        </li>
        <li>Update what you want.</li>
        <li>When a user updates, the Tech is placed in "Unconfirmed Tech".</li>
        <li>If an Admin updates a Tech, it is approved and directly added to the radar</li>
      </ul>
      <h3>
        <span role="img" aria-label={"robot"}>
          🤖
        </span>
        Administrators
      </h3>
      <ul>
        <p>Admins receives some options other users does not. "Add radar" and "User management".</p>

        <li>
          <b>Add radar</b> lets the admin create a radar. There are two checkboxes here, letting the
          admin make a public radar displayed in the https://cop-tech-radar.com for the whole world.
          The admin can also create a radar based on multiple other radars. By highlighting other
          radars and checking off "Create Radar with Technology from selected radars" the admin will
          create a new radar merging all other technology in selected radars. The other radars are
          not deleted.
        </li>
        <li>
          <b>Delete radar</b> is displayed as a red cross in the list of radars. This is only for
          administrators.
        </li>
        <li>
          <b>User management</b> contains a list over all users, and gives the admin the chance to
          make other users admins.
        </li>
      </ul>
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
