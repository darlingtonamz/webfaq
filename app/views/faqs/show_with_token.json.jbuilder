json.faq @faq.questions.each do |q|
	json.content q.content
	json.answer q.answer
	json.comment q.comments, :content, :created_at
	json.comment_count q.comments.count
	json.votes q.votes_for.size 
end
