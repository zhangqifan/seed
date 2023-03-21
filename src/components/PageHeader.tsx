import React from "react";
import "tailwindcss/tailwind.css";

const PageHeader = () => {
	return (
		<div className="mx-auto max-w-2xl text-center">
			<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Seed 调优测试
			</h2>
			<p className="mt-2 text-lg leading-8 text-gray-600">
				此实验页面提供了批量随机 seed 生成和指定 seed 范围两种测试方式
			</p>
		</div>
	);
};

export default PageHeader;
