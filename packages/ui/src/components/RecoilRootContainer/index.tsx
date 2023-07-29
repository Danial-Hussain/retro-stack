"use client";
import { RecoilRoot, RecoilRootProps } from "recoil";

const RecoilRootContainer: React.FC<RecoilRootProps> = (props) => (
  <RecoilRoot {...props} />
);

export default RecoilRootContainer;
