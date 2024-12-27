import React from 'react'
import {Link} from 'react-router-dom'

const Articles = ({articles}) => {
	return (
		<>
			{articles.map((article, index) => (
				<div key={index} className="p-4 md:w-1/2">
					<div className="h-full shadow-xl border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:bg-green-900">
								<Link to={`/article/${article.name}`}>
									<img src={article.thumbnail} className="lg:h-48 md:h-36 w-full object-cover object-center" alt=""/>
								</Link>
						<div className="p-6 hover:text-white">
									<Link key={index} to={`/article/${article.name}`}>
								<h3 className="text-lg font-medium text-gray-900 mb-3 hover:text-white">{article.title}</h3>
									</Link>
							<p className="leading-relaxed mb-3 hover:text-white ">
										{article.content[0].substring(0,110)}...
									</p>
									<div className="flex items-center flex-wrap">
										<Link className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" to={`/article/${article.name}`}>
											Learn More
										</Link>
									</div>
								</div>
							</div>
						</div>
						))}
		</>
	)
}

export default Articles