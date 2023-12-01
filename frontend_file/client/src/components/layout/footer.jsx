import { Divider } from "antd";
import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

export default function FooterLayout() {
  return (
    <>
      <Divider className="dark:bg-gray-600 " />
      <Footer container className="bottom-0 shadow-neutral-700 dark:bg-sub-dark shadow-none">
        <div className="w-full text-center">
          <div className="w-full justify-between flex items-center">
            <Footer.Brand />
            <div className="w-full flex items-center justify-between">
              <Footer.LinkGroup className="w-full flex items-center justify-between">
                <div className="gap-4 flex items-center justify-between">
                  <Footer.Copyright by=", Steffansim" year={2023} />
                </div>
                <div className="gap-4 flex items-center justify-between sm:my-2 my-2">
                  <Footer.Link href="#">Footer 1</Footer.Link>
                  <Footer.Link href="#">Footer 2</Footer.Link>
                  <Footer.Link href="#">Footer 3</Footer.Link>
                  <Footer.Link href="#">Footer 4</Footer.Link>{" "}
                </div>
                <div className="gap-4 flex items-center justify-between">
                  <Footer.Icon href="#" icon={BsFacebook} />
                  <Footer.Icon href="#" icon={BsInstagram} />
                  <Footer.Icon href="https://www.linkedin.com/in/steffansim/" icon={BsLinkedin} />
                  <Footer.Icon href="https://github.com/itsaFan" icon={BsGithub} />
                </div>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
}
